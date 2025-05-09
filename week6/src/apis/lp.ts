
import { axiosInstance } from "../apis/axios";
import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from '../types/lp';


export const getLpList = async(
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get("/v1/lps",{
    params: paginationDto,
  })
  return data;
}


