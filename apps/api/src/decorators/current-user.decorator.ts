import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Professional } from '../professional/entities/professional.entity'; // Adjust path to your Professional entity

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Professional => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Alternative version if you want to extract specific professional properties
export const CurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id;
  },
);

// Version that allows you to specify which professional property to extract
export const CurrentUserProperty = createParamDecorator(
  (property: keyof Professional, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return property ? user?.[property] : user;
  },
);

// Additional decorators specific to Professional entity
export const CurrentProfessional = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Professional => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const CurrentProfessionalEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.email;
  },
);

export const CurrentProfessionalDiscipline = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.discipline;
  },
);