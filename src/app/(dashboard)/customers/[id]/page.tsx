import { CustomerDetailView } from "@/features/customers";

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  return <CustomerDetailView customerId={params.id} />;
}
