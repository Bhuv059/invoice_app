import React from "react";
import Container from "@/components/Container";

const Footer = () => {
  return (
    <footer className="mt-6 mb-8">
      <Container className="flex justify-between gap-4">
        <p>Invoicipedia &copy; {new Date().getFullYear()}</p>
        <p>Created by DevJs</p>
      </Container>
    </footer>
  );
};

export default Footer;
