import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary p-6">
      <div className="bg-secondary text-light p-24 rounded-lg shadow-lg max-w-[600px] w-full space-y-12">
        <h1 className="text-5xl font-bold text-center ">Of The Day</h1>
        <SignIn className="items-center justify-center text-center" />
      </div>
    </div>
  );
}
