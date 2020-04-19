import { Request } from "express";

export const AuthorizationHeader = "authorization";
export const XHasuraAdminSecret = "x-hasura-admin-secret";
export const XHasuraRole = "x-hasura-role";
export const XHasuraUserID = "x-hasura-user-id";
export const ContentType = "Content-type";
export const ContentTypeJson = "application/json";

export const HASURA_ROLE_ADMIN = "admin";
export const HASURA_ROLE_USER = "user";
export const HASURA_ROLE_ANONYMOUS = "anonymous";
export const HASURA_ROLES = [
  HASURA_ROLE_ADMIN,
  HASURA_ROLE_USER,
  HASURA_ROLE_ANONYMOUS
];

export const GQL_ROLE_ADMIN = HASURA_ROLE_ADMIN.toUpperCase();
export const GQL_ROLE_USER = HASURA_ROLE_USER.toUpperCase();
export const GQL_ROLE_ANONYMOUS = HASURA_ROLE_ANONYMOUS.toUpperCase();

export const STATUS_INACTIVE = "inactive";
export const STATUS_ACTIVE = "active";
export const STATUS_DISABLED = "disabled";
export const STATUS_DELETED = "deleted";

export const STATUSES = [
  STATUS_ACTIVE,
  STATUS_INACTIVE,
  STATUS_DISABLED,
  STATUS_DELETED,
];

export type Status
  = typeof STATUS_ACTIVE
  | typeof STATUS_INACTIVE
  | typeof STATUS_DISABLED
  | typeof STATUS_DELETED;

export type HasuraRole
  = typeof HASURA_ROLE_ADMIN
  | typeof HASURA_ROLE_USER
  | typeof HASURA_ROLE_ANONYMOUS;

export type GQLRole
  = typeof GQL_ROLE_ADMIN
  | typeof GQL_ROLE_USER
  | typeof GQL_ROLE_ANONYMOUS;

export interface IGraphQLContext {
  request: Request;
}

// event trigger payload
// https://hasura.io/docs/1.0/graphql/manual/event-triggers/payload.html
export interface IStringObject { [key: string]: string; }
export interface IAnyObject { [key: string]: any; }
export interface IBaseSessionVariables {
  [XHasuraRole]: HasuraRole;
  [key: string]: string;
}

export interface IAuthSessionVariables extends IBaseSessionVariables {
  [XHasuraUserID]: string;
}

export type SessionVariables<T = IBaseSessionVariables> = T | null;

export const INSERT = "INSERT";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const MANUAL = "MANUAL";

export type HasuraEventTriggerOpName
  = typeof INSERT
  | typeof UPDATE
  | typeof DELETE
  | typeof MANUAL;

export interface IHasuraEventTriggerEvent<
  OP extends HasuraEventTriggerOpName,
  O = IAnyObject,
  N = IAnyObject,
  S = SessionVariables
  > {
  session_variables: S;
  op: OP;
  data: {
    old: O;
    new: N;
  };
}

export type HasuraEventTriggerEvent = IHasuraEventTriggerEvent<HasuraEventTriggerOpName>;

export type HasuraEventTriggerInsert<N = IAnyObject> =
  IHasuraEventTriggerEvent<typeof INSERT, null, N>;

export type HasuraEventTriggerUpdate<N = IAnyObject> =
  IHasuraEventTriggerEvent<typeof UPDATE, N, N>;

export type HasuraEventTriggerDelete<N = IAnyObject> =
  IHasuraEventTriggerEvent<typeof DELETE, N, null>;

export type HasuraEventTriggerManual<N = IAnyObject> =
  IHasuraEventTriggerEvent<typeof MANUAL, N, null>;

export interface IHasuraEventTriggerInfo<N = string> {
  name: N;
}

export interface IHasuraEventTriggerTable {
  schema: string;
  name: string;
}

export interface IHasuraEventTriggerPayload<
  E extends IHasuraEventTriggerEvent<HasuraEventTriggerOpName>,
  N = string
  > {
  event: E;
  created_at: string;
  id: string;
  trigger: IHasuraEventTriggerInfo<N>;
  table: IHasuraEventTriggerTable;
}

// action handler interface
// https://hasura.io/docs/1.0/graphql/manual/actions/action-handlers.html#action-handlers
export interface IHasuraActionPayload<A = string, T = IAnyObject, S = SessionVariables> {
  action: {
    name: A;
  };
  session_variables: S;
  input: T;
}

export interface IHasuraActionErrorResponse {
  message: string;
  code?: string;
}

export class HasuraActionError extends Error implements IHasuraActionErrorResponse {

  public code?: string;
  public message: string;
  public details?: any;

  constructor(
    { message, code, details }: IHasuraActionErrorResponse
      & { details?: any }) {
    super(message);
    this.message = message;
    this.code = code;
    this.details = details;
  }

}

export const HASURA_ACTION_SUCCESS_STATUS = 200;
export const HASURA_ACTION_ERROR_STATUS = 400;

export const HASURA_EVENT_TRIGGER_SUCCESS_STATUS = 200;
export const HASURA_EVENT_TRIGGER_ERROR_STATUS = 400;

export interface IRequestHeaders {
  [key: string]: string;
}
