import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <h1 style={{ textAlign: "center" }}> Dashboard </h1>
    </>
  );
}
