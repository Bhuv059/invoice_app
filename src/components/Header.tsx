import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Container from "@/components/Container";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";

const Header = async () => {
  return (
    <header className="mt-8 mb-12">
      <Container className="flex justify-between gap-4">
        <div className="flex  justify-between text-center gap-4 border-1 ">
          <div className="flex justify-between  text-between gap-4 ">
            <p className="font-bold mt-1">
              <Link href="/dashboard">Invoicipedia</Link>
            </p>
            <SignedIn>
              <span className="">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </span>
            </SignedIn>
          </div>
        </div>
        <div>
          <SignedOut>
            <Button asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Container>
    </header>
  );
};

export default Header;
