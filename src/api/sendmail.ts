export type TypeEmail = {
  name: string;
  email: string;
  content: string;
  message: string;
  phone: string;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function sendEmail(
  sendmail: TypeEmail,
  name_site: string
): Promise<void> {
  const { name, email, message, phone, content } = sendmail;

  try {
    await delay(3000);
    const response = await fetch("/api/send-mail", {
      method: "POST",
      body: JSON.stringify({ name, email, message, phone, content, name_site }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
