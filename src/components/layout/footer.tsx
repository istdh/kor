import Link from "next/link"
import { TypeCommon } from "../../../type"
import { ContactIconsList } from "../common/contact-icons"
import Image from "next/image"
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';

interface Props {
  common: TypeCommon
  links: any
}

export const FooterLinks = ({ common, links }: Props) => {
  const MOCKDATA = [
    { title: 'Email', description: common?.email, icon: IconAt },
    { title: 'Điện thoại', description: common?.hotline, icon: IconPhone },
    { title: 'Địa chỉ', description: common?.address, icon: IconMapPin },
    { title: 'Giờ làm việc', description: '8:00 AM – 5:00 PM', icon: IconSun },
  ];
  const name = common?.name.split('|') || ["", ""]
  return (
    <footer aria-label="Site Footer" className="bg-green-700">
      <div className="mx-auto padding">

        <div className="">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 flex-1 gap-10">
            <div className="text-white">

              <Link className="relative inline-block !w-[200px] !h-[90px] mb-5" href="/"><Image fill alt="logo viện môi trường" src={common?.logo.url} /></Link>

              <div>
                <ContactIconsList data={MOCKDATA} variant="white" />
              </div>
            </div>



            <div className="xl:mx-auto">
              <p className="font-medium text-xl text-white">Menu</p>
              <nav aria-label="Footer Navigation - Services" className="mt-6">
                <ul className="space-y-2 ">
                  <li>
                    <Link href="/ve-chung-toi" className="text-white transition hover:opacity-75">
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link href="/du-an" className="text-white transition hover:opacity-75">
                      Dự án
                    </Link>
                  </li>
                  <li>
                    <Link href="/dich-vu" className="text-white transition hover:opacity-75">
                      Dịch vụ
                    </Link>
                  </li>
                  <li>
                    <Link href="/dao-tao" className="text-white transition hover:opacity-75">
                      Đào tạo
                    </Link>
                  </li>
                  <li>
                    <Link href="/nckh-cgcn" className="text-white transition hover:opacity-75">
                      NCKH - CGCN
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="xl:mx-auto">
              <p className="font-medium  text-xl text-white">Liên kết</p>
              <nav aria-label="Footer Navigation - Company" className="mt-6">
                <ul className="space-y-2">
                  {links.map((link: any) => (
                    <li key={link.id}>
                      <Link href={link.link} className="text-white transition hover:opacity-75">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="xl:mx-auto">
              <p className="font-medium text-xl text-white">Bản đồ</p>
              <div className="mt-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14894.552456358486!2d105.7629415!3d21.0471612!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454c3a2eb68cf%3A0x8b25daa246e0def7!2zVmnhu4duIEtob2EgSOG7jWMgxJDDoG8gVOG6oW8gUGjDoXQgVHJp4buDbiBOaMOibiBM4buxYw!5e0!3m2!1sen!2s!4v1683185988976!5m2!1sen!2s" className="w-full h-[200px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>

              <div className="mt-2">
                <div className="col-span-2">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Đăng ký nhận tin mới nhất
                    </h2>
                    <p className="mb-4 text-white text-sm mb-2">
                      Cam kết bảo mật thông tin khách hàng
                    </p>
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                  <form className="w-full">
                    <label htmlFor="UserEmail" className="sr-only"> Email </label>
                    <div className="border border-gray-100 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4">
                      <input type="email" id="UserEmail" placeholder="example@email.com" className="w-full border-none placeholder:text-white px-2 text-white outline-none bg-transparent focus:border-transparent focus:ring-transparent sm:text-sm" />
                      <button className="mt-1 w-full bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 py-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className=" text-white text-center ">
            © 2023. {name[0] + " " + name[1]}. All rights reserved.
          </p>
          {/* <nav aria-label="Footer Navigation - Support">
            <ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-end">
              <li>
                <Link href="#" className="text-white transition hover:opacity-75">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white transition hover:opacity-75">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white transition hover:opacity-75">
                  Cookies
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>

    </footer>

  )
}

// export default FooterLinks