export interface IResponse {
  status: number;
  data?: any;
}

export const getPoke = async (poke: string): Promise<IResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`, {
    method: "GET",
  });

  let responseData: IResponse;

  if (response.ok) {
    responseData = {
      status: response.status,
      data: await response.json(),
    };
  } else {
    responseData = {
      status: 402,
    };
  }

  return responseData;
};
