import React from 'react';

type Props = {
  searchParams: Promise<{ token: string }>
}
const page = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  return (
    <div>
      {JSON.stringify(token)}
    </div>
  );
};

export default page;