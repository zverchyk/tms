import { Header } from "../accessories/Accessories";
export default function CpeLayout({
  children, title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  console.log(title)
  return (
      
    <div>
        {title &&<Header title={title}></Header>}
        <main>{children}</main>
        </div>
  );
}

