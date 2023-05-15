import { getCommon, getCooperation, getLinks, getProjects, getResearchs, getServices } from '@/api/services'
import { ContactIconsList } from '@/components/common/contact-icons'
import Layout from '@/components/layout/layout'
import { Breadcrumbs, Button, Group, Paper, SimpleGrid, TextInput, Textarea, Text, createStyles, rem, CheckIcon } from '@mantine/core'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { IconSun, IconPhone, IconMapPin, IconAt, IconX } from '@tabler/icons-react';
import sendEmail, { TypeEmail } from '@/api/sendmail'
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

function Contact() {
  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data

  const [isLoading, setIsLoading] = useState(false)

  const MOCKDATA = [
    { title: 'Email', description: commons[0]?.email, icon: IconAt },
    { title: 'Điện thoại', description: commons[0]?.hotline, icon: IconPhone },
    { title: 'Địa chỉ', description: commons[0]?.address, icon: IconMapPin },
    { title: 'Giờ làm việc', description: '8:00 AM – 5:00 PM', icon: IconSun },
  ];


  const { classes } = useStyles();

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
  const newName = commons[0]?.name.split("|") || ["", ""]

  return (
    <Layout links={links} cooperation={cooperation} services={services} projects={projects} common={commons[0]} >
      <Head>
        <title>Liên hệ - {newName[0]} {newName[1]}</title>
      </Head>
      <div className="padding">
        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 before:absolute before:left-0 mb-5 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500 font-medium' href={"/"}>Trang chủ</Link>
          <p className='font-medium'>Liên hệ</p>
        </Breadcrumbs>

        <Paper shadow="md" radius="lg">
          <div className={classes.wrapper}>
            <div className={classes.contacts}>
              <Text fz="lg" fw={700} className={classes.title} c="#fff">
                THÔNG TIN LIÊN HỆ
              </Text>

              <ContactIconsList data={MOCKDATA} variant="white" />
            </div>

            <form className={classes.form} onSubmit={form.onSubmit(async (values) => await handleSubmit(values, commons[0].name))}>
              <Text fz="lg" fw={700} className={classes.title}>
                ĐỂ LẠI THÔNG TIN LIÊN HỆ TẠI ĐÂY
              </Text>

              <div className={classes.fields}>
                <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  <TextInput label="Họ tên" placeholder="Nhập họ tên" {...form.getInputProps('name')} />
                  <TextInput withAsterisk label="Số điện thoại" placeholder="Nhập số điện thoại"  {...form.getInputProps('phone')} />
                  <TextInput label="Email" placeholder="info@email.com"  {...form.getInputProps('email')} />
                </SimpleGrid>

                <TextInput mt="md" label="Nội dung" placeholder="Nhập nội dung bạn quan tâm"  {...form.getInputProps('content')} />

                <Textarea
                  mt="md"
                  label="Tin nhắn"
                  placeholder="Nhập lời nhắn bạn muốn để lại cho chúng tôi..."
                  minRows={3}
                  {...form.getInputProps('message')}
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
      </div>
    </Layout>
  )
}

export default Contact


export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(['services'], getServices)
  await queryClient.prefetchQuery(['projects'], getProjects)
  await queryClient.prefetchQuery(['cooperation'], getCooperation)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10
  }
}