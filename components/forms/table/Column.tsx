"use client";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import StatusBadge from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Lawyers } from "@/constants";
import AppointmentModal from "@/components/AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => {
      console.log(row.original);

      <p className="text-14-medium">{row.index + 1}</p>;
    },
  },

  {
    accessorKey: "data",
    header: "Client",
    cell: ({ row }) => {
      const clientRow = row.original.client_collection;

      console.log({ clientRow });

      return (
        // <p className="text-14-medium">{clientRow.client_collection.name}</p>

        ''
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusRow = row.original;

      return (
        <div className="min-w-[115px]">
          <StatusBadge status={statusRow.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const scheduleRow = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(scheduleRow.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primary_counsel_or_lawyer",
    header: () => <div className="text-center">Lawyer</div>,
    cell: ({ row }) => {
      const lawyerRow = row.original.primary_counsel_or_lawyer;
      const lawyer = Lawyers.find(
        (singleLawyer) => singleLawyer.name === lawyerRow
      );
      return (
        <div className="flex items-center       gap-3     text-right font-medium">
          <Image
            className="rounded-full size-10"
            src={lawyer?.image}
            alt={lawyer?.name || "lawyer"}
            width={100}
            height={100}
          />
          <p className="whitespace-nowrap">{lawyer?.name} Esq</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className=" gap-1 hidden">
          <AppointmentModal
            type="schedule"
            clientId={data.client_collection.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            clientId={data.client_collection.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];

