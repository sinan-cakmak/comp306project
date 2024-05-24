import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/sign_in_background.jpg')` }}
      >
        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg">
        <SignIn path="/sign-in" />
      </div>
    </div>
  );
}
