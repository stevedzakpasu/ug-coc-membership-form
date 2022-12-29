import { Inter } from "@next/font/google";
import CreateAccount from "./register";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <CreateAccount />
    </>
  );
}
