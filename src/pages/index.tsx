import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired as withPageAuthRequiredCSR } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired as withPageAuthRequiredSSR } from "@auth0/nextjs-auth0";

export default withPageAuthRequiredCSR(function Home() {
  const session = useUser();

  return (
    <>
      <Head>
        <title>Nextjs learn</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello next</h1>
    </>
  );
});

export const getServerSideProps = withPageAuthRequiredSSR();
