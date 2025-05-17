import type { LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import type { Route } from "./+types/trip-detail";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import { Header, InfoPill, TripCard } from "../../../components";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) throw new Error("Trip ID is required!");

  const [trip, trips] = await Promise.all([
    getTripById(tripId),
    getAllTrips(4, 0),
  ]);

  //   Performance issue, it doesnt need to load after one another
  //   it can just be load at the same time

  //   const trips = await getAllTrips(4, 0);
  //   const trip = await getTripById(tripId);

  //   learn this
  return {
    trip,
    allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
  };
};

const tripDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.trip?.imageUrls || [];
  const tripData = parseTripData(loaderData?.trip?.tripDetail);

  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};

  const allTrips = loaderData?.allTrips as Trip[] | [];

  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    { title: "Best Time to Visit: ", items: bestTimeToVisit },
    { title: "Weather: ", items: weatherInfo },
  ];

  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />

      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">{name}</h1>
          <div className="flex items-center gap-5">
            <InfoPill
              text={`${duration} day plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={
                itinerary
                  ?.slice(0, 4)
                  .map((item) => item.location)
                  .join(", ") || ""
              }
              image="/assets/icons/location-mark.svg" 
            />
          </div>
        </header>
        <section className="gallery">
          {imageUrls.map((url: string, index: number) => (
            <img
              src={url}
              key={index}
              className={cn(
                "w-full rounded-xl object-cover",
                index === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
            />
          ))}
        </section>
        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <ChipListComponent>
            <ChipsDirective>
              {pillItems.map((pill, index) => (
                <ChipDirective
                  key={index}
                  text={getFirstWord(pill.text)}
                  cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>

          <ul className="flex gap-1 items-center">
            {Array(5)
              .fill("null")
              .map((_, index) => (
                <li key={index}>
                  <img
                    src="/assets/icons/star.svg"
                    alt="star"
                    className="size-[18px]"
                  />
                </li>
              ))}

            <li className="ml-1">
              <ChipListComponent>
                <ChipsDirective>
                  <ChipDirective
                    text="5/5"
                    cssClass="!bg-yellow-50 !text-yellow-700"
                  />
                </ChipsDirective>
              </ChipListComponent>
            </li>
          </ul>
        </section>
        <section className="title">
          <article>
            <h3>
              {duration}-Day {country} {travelStyle} Trip
            </h3>

            <p>
              {budget}, {groupType} and {interests}
            </p>
          </article>
          <h2>{estimatedPrice}</h2>
        </section>
        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>
        <section>
          <h2 className="text-2xl font-semibold text-dark-100 mb-6">
            Itinerary Overview
          </h2>
          <ul className="space-y-8">
            {itinerary?.map((dayPlan: DayPlan, index: number) => (
              <li
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-primary-500 mb-4 flex items-center gap-2">
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-sm">
                    Day {dayPlan.day}
                  </span>
                  <span>{dayPlan.location}</span>
                </h3>

                <ul className="space-y-4 pl-4">
                  {dayPlan.activities.map((activity, aidx) => (
                    <li
                      key={aidx}
                      className="flex items-start gap-6 relative before:content-[''] before:absolute before:left-[-1rem] before:top-[0.6rem] before:w-2 before:h-2 before:bg-primary-300 before:rounded-full"
                    >
                      <span className="w-24 text-sm font-medium text-primary-600 shrink-0 bg-primary-50 px-2 py-1 rounded">
                        {activity.time}
                      </span>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {activity.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        {visitTimeAndWeatherInfo.map((section) => (
          <section key={section.title} className="visit">
            <div>
              <h3>{section.title}</h3>

              <ul>
                {section.items?.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>

        <div className="trip-grid">
          {allTrips.map(
            ({
              id,
              name,
              imageUrls,
              location,
              interests,
              travelStyle,
              estimatedPrice,
            }) => (
              <TripCard
                id={id}
                key={id}
                name={name}
                location={location.city ?? ""}
                imageUrl={imageUrls[0]}
                tags={[interests, travelStyle]}
                price={estimatedPrice}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default tripDetail;
