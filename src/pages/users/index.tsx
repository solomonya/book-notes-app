import { ShowList } from "@/components";
import { prisma } from "@/server/prismaClient";
import { User } from "@prisma/client";
import React from "react";

type TProps = {
  users: User[];
};

function Users({ users }: TProps) {
  return (
    <section className="p-10">
      <ShowList list={users}>
        {(user) => {
          const userEntries = Object.entries(user);
          return (
            <div key={user.id} className="p-5 bg-slate-100 rounded-xl">
              {userEntries.map(([key, value]) => (
                <p key={`${key}`}>{`${key}: ${value}`}</p>
              ))}
            </div>
          );
        }}
      </ShowList>
    </section>
  );
}

export async function getStaticProps() {
  const users = await prisma.user.findMany();

  return { props: { users: JSON.parse(JSON.stringify(users)) } };
}

export default Users;
