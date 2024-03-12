import { SetMetadata } from "@nestjs/common";

export const IsAdmin = (is_admin: boolean) => SetMetadata("is_admin", is_admin);
