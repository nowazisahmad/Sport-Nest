import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function FacilityNotFound() {
  return (
    <section className="container mx-auto px-4 py-20">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle className="text-lg">Facility not found</EmptyTitle>
          <EmptyDescription>
            This facility may have been removed, or the link is incorrect.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/facilities" className={buttonVariants()}>
            Browse All Facilities
          </Link>
        </EmptyContent>
      </Empty>
    </section>
  );
}
