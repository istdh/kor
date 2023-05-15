import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  rem,
  Modal,
  CheckIcon
} from '@mantine/core';
import { ContactIconsList } from './contact-icons';
import { TypeCommon } from '../../../type';
import { IconSun, IconPhone, IconMapPin, IconAt, IconX } from '@tabler/icons-react';
import sendEmail, { TypeEmail } from '@/api/sendmail';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: rem(4),
      border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: rem(-12),
    },

    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: theme.radius.lg,
      backgroundColor: "#15803D",
      // backgroundImage: `url(${bg.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(280)}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

type Props = {
  opened: boolean
  close: () => void
  common: TypeCommon
}

export function ContactUs({ opened, close, common }: Props) {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TypeEmail>({
    initialValues: {
      name: "",
      email: "",
      content: "",
      message: "",
      phone: ""
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ'),
      name: value => value.length < 5 ? "Vui lòng nhập họ tên hợp lệ" : null,
      content: value => value.length < 5 ? "Vui lòng nhập nội dung" : null,
      phone: value => /((09|03|07|08|05)+([0-9]{8})\b)/g.test(value) ? null : "Vui lòng nhập số điện thoại"
    },
  })

  const MOCKDATA = [
    { title: 'Email', description: common?.email, icon: IconAt },
    { title: 'Điện thoại', description: common?.hotline, icon: IconPhone },
    { title: 'Địa chỉ', description: common?.address, icon: IconMapPin },
    { title: 'Giờ làm việc', description: '8:00 AM – 5:00 PM', icon: IconSun },
  ];

  const handleSubmit = (values: TypeEmail, name_site: string) => {
    setIsLoading(true)
    sendEmail(values, name_site).then(res => {
      notifications.show({
        title: "Thành công!", message: "Thông tin đã được ghi nhận.", icon: <CheckIcon />, styles: (theme) => ({

          root: {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.green[6],
            borderWidth: 1,

            // '&::before': { backgroundColor: theme.white },
          },
          icon: { backgroundColor: theme.colors.green },
          title: { color: theme.colors.green },
          description: { color: theme.colors.green },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.green[7] },
          },
        }),
      })
    }).catch((err) => {
      notifications.show({
        title: "Lỗi!", message: "Lỗi hệ thống vui lòng thử lại sau.", icon: <IconX />, styles: (theme) => ({

          root: {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.red[6],
            borderWidth: 1,

            // '&::before': { backgroundColor: theme.white },
          },
          icon: { backgroundColor: theme.colors.red },
          title: { color: theme.colors.red },
          description: { color: theme.colors.red },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[7] },
          },
        }),
      })
    }).finally(() => setIsLoading(false))
  }

  return (
    <Modal size="90%" opened={opened} onClose={close} centered>
      <Paper shadow="md" radius="lg">
        <div className={`${classes.wrapper}`}>
          <div className={classes.contacts}>
            <Text fz="lg" fw={700} className={classes.title} c="#fff">
              THÔNG TIN LIÊN HỆ
            </Text>

            <ContactIconsList data={MOCKDATA} variant="white" />
          </div>

          <form className={classes.form} onSubmit={form.onSubmit(async (values) => await handleSubmit(values, common?.name))}>
            <Text fz="lg" fw={700} className={classes.title}>
              ĐỂ LẠI THÔNG TIN LIÊN HỆ TẠI ĐÂY
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput withAsterisk label="Họ tên" placeholder="Nhập họ tên"  {...form.getInputProps('name')} />
                <TextInput withAsterisk label="Số điện thoại" placeholder="Nhập số điện thoại"  {...form.getInputProps('phone')} />
                <TextInput withAsterisk label="Email" placeholder="info@email.com"  {...form.getInputProps('email')} />
              </SimpleGrid>

              <TextInput mt="md" label="Nội dung" placeholder="Nhập nội dung bạn quan tâm"  {...form.getInputProps('content')} />

              <Textarea
                {...form.getInputProps('message')}
                mt="md"
                label="Tin nhắn"
                placeholder="Nhập lời nhắn bạn muốn để lại cho chúng tôi..."
                minRows={3}
              />

              <Group position="right" mt="md">
                <Button disabled={isLoading} type="submit" variant='outline' className={classes.control}>
                  {isLoading ? "Gửi thông tin..." : "Gửi thông tin"}
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>

    </Modal>
  );
}