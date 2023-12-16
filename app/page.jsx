import React from "react";
import TicketCard from "./(components)/TicketCard";
import Hero from "./(components)/Hero";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <Hero />
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div
              key={categoryIndex}
              className="my-6 backdrop-brightness-75 w-3/4 mx-auto rounded-md px-20 py-6"
            >
              <h2 className="text-center">{uniqueCategory}</h2>
              <hr className="my-2 mx-auto w-3/4" />
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
