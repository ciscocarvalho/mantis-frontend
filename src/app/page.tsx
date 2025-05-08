import { BACKEND_URL } from "../constants";

type Leds = { color: string; state: string }[];

const fetchData = async (
  method: string,
  route: string,
  bodyOptions?: object,
) => {
  let res;

  try {
    const fullUrl = `${BACKEND_URL}${route}`;

    res = await fetch(fullUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: bodyOptions ? JSON.stringify(bodyOptions) : undefined,
    });
  } catch (error: any) {
    return {};
  }

  const payload = await res.json();

  payload?.errors?.forEach((error: { message: string }) =>
    console.error(error.message),
  );

  return payload;
};

const fetchLeds = async (): Promise<Leds> => {
  const result = await fetchData("get", "/led");
  return result.data.leds;
};

export default async function Home() {
  const leds = await fetchLeds();
  console.log("leds", leds);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-center w-full text-5xl">It works!</h1>

        <ol className="">
          {leds.map((v, i) => {
            return (
              <li className="" key={i}>
                <p>Color: {v.color}</p>
                <p>State: {v.state}</p>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
