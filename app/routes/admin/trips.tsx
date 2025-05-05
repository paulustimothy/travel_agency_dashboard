import { Header } from "../../../components";
import React from "react";

const trips = () => {
  return (
    <main className="trips wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />
    </main>
  );
};

export default trips;
