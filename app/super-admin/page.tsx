import Dashboard from "../dashboard/page";
import AdminDashboard from "./_components/adminDashboard";
import AdminManagementTable from "./_components/AdminManage";
import Companies from "./_components/Companies";
import LogsTable from "./_components/Logs";
import PaymentTable from "./_components/Payments";
import SubscriptionsTable from "./_components/Subscription";




export default function SuperAdminPage() {

  
  return (
    <div>
     <AdminDashboard />
     <Companies />
     <LogsTable />
     <PaymentTable />
      <SubscriptionsTable />
      <AdminManagementTable />

    </div>
  );
}  