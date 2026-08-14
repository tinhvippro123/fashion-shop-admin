import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Search, MoreHorizontal, Eye, Trash2, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { useContacts } from "@/features/content/hooks/useContacts";
import { Contact } from "@/features/content/types/contact.admin";
import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { getContactActions } from "../utils/action-resolvers";

interface ContactTableActionsProps {
  contact: Contact;
}

function ContactTableActions({ contact }: ContactTableActionsProps) {
  const actions = getContactActions(contact);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted outline-none">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.includes('VIEW') && (
          <DropdownMenuItem render={<Link href={`/contacts/${contact.id}`} className="w-full cursor-pointer" />}>
            <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
          </DropdownMenuItem>
        )}
        {actions.includes('DELETE') && (
          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Xóa</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ContactTable() {
  const { contacts, isLoading } = useContacts();

  

  return (
    <>

      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm liên hệ..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Chủ đề</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableSkeleton columns={6} /> : (
contacts.map((contact) => (
                <TableRow key={contact.id} className={contact.status === "Chưa đọc" ? "bg-muted/50 font-medium" : ""}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{contact.name}</span>
                      <span className="text-sm text-muted-foreground font-normal">{contact.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell className="text-muted-foreground">{contact.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      contact.status === "Chưa đọc" ? "bg-blue-100 text-blue-800" : "bg-muted text-foreground"
                    }`}>
                      {contact.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <ContactTableActions contact={contact} />
                  </TableCell>
                </TableRow>
              ))
)}
            </TableBody>
          </Table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden flex flex-col">
          {contacts.map((contact) => (
            <div key={contact.id} className={`flex flex-col gap-2 p-4 border-b last:border-0 relative ${contact.status === "Chưa đọc" ? "bg-muted/50" : ""}`}>
              <div className="flex flex-col pr-8">
                <span className={`text-sm ${contact.status === "Chưa đọc" ? "font-bold text-foreground" : "font-medium text-foreground"}`}>
                  {contact.name}
                </span>
                <span className="text-xs text-muted-foreground mb-1">{contact.email}</span>
                <span className={`text-sm leading-tight ${contact.status === "Chưa đọc" ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                  {contact.subject}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">{contact.date}</span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      contact.status === "Chưa đọc" ? "bg-blue-100 text-blue-800" : "bg-muted text-foreground"
                    }`}>
                      {contact.status}
                  </span>
                </div>
              </div>

              <div className="absolute top-3 right-2">
                <ContactTableActions contact={contact} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
