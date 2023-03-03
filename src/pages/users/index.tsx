import { ShowList } from "@/components";
import { prisma } from "@/prisma";
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

  return { props: { users } };
}

export default Users;
