import {columns, Payment} from "@/components/forms/table/Column";
import { DataTable } from "@/components/forms/table/DataTable";
// import DataTable from "@/components/forms/table/DataTable";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";






async function Admin() {


  const appointments = await getRecentAppointmentList();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href={"/"} className="cursor-pointer">
          <Image
            priority
            src="/assets/icons/logo-full_.png"
            alt="logo"
            width={10000}
            height={10000}
            className="mb-12 h-40 mx-auto w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome </h1>
          <p className="text-dark-700">
            {" "}
            Start the day with managing new appointments.
          </p>
        </section>
      
        <section className="admin-stat">
          <StatCard
            type={"appointments"}
            count={appointments.scheduleCount}
            label={"Schedule Appointments"}
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type={"pending"}
            count={appointments.pendingCount}
            label={"Pending Appointments"}
            icon={"/assets/icons/pending.svg"}
          />{" "}
          <StatCard
            type={"cancelled"}
            count={appointments.cancelledCount}
            label={"Cancelled Appointments"}
            icon={"/assets/icons/cancelled.svg"}
          />
              </section>
            
              <DataTable data={appointments.documents} columns={ columns } />
              {/* <DataTable data={data} columns={ columns } /> */}
      </main>
    </div>
  );
}

export default Admin;
