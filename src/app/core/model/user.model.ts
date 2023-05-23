import {AnimalsDto} from "../../animals/animals.service";

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: Date;
  email: string;
  roles?: string[];
  animals: AnimalsDto[];
  friend: boolean;
  me: boolean;
  invitationStatus: string;
  image: string;
}
