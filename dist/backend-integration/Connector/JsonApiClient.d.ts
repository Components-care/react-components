import AuthMode from "./AuthMode";
export declare type GetParams = Record<string, unknown> | null;
/**
 * The authentication handler callback has to provide and/or obtain the authentication
 * @returns The Authentication header value
 * @throws If the user has no session
 */
export declare type AuthenticationHandlerCallback = (authMode: AuthMode) => Promise<string> | string;
/**
 * Can be used to show a loading status.
 * @param method The HTTP Verb
 * @param url The url of the request
 * @param args The query parameters of the request
 * @param body The JSON body of the request
 * @param auth The authentication mode of the request
 */
export declare type RequestHook = (method: string, url: string, args: GetParams, body: unknown | null, auth: AuthMode) => Promise<void> | void;
/**
 * The response processor throws if the response is erroneous
 * @param method The HTTP Verb
 * @param url The url of the request
 * @param args The query parameters of the request
 * @param body The JSON body of the request
 * @param auth The authentication mode of the request
 * @param response The HTTP response
 * @param responseData The JSON response data
 */
export declare type ResponseProcessor = (response: Response, responseData: unknown, method: string, url: string, args: GetParams, body: unknown | null, auth: AuthMode) => Promise<unknown> | unknown;
/**
 * A helper class to connect to JSON REST apis
 */
declare class JsonApiClient {
    handleAuthentication: AuthenticationHandlerCallback;
    handleResponse: ResponseProcessor;
    handlePreRequest?: RequestHook;
    handlePostRequest?: RequestHook;
    constructor(authHandler: AuthenticationHandlerCallback, responseProcessor: ResponseProcessor, preRequestHook?: RequestHook, postRequestHook?: RequestHook);
    /**
     * @see http
     */
    get<T>(url: string, args: GetParams, auth?: AuthMode): Promise<T>;
    /**
     * @see http
     */
    post<T>(url: string, args: GetParams, body: Record<string, unknown>, auth?: AuthMode): Promise<T>;
    /**
     * @see http
     */
    put<T>(url: string, args: GetParams, body: Record<string, unknown>, auth?: AuthMode): Promise<T>;
    /**
     * @see http
     */
    patch<T>(url: string, args: GetParams, body: Record<string, unknown>, auth?: AuthMode): Promise<T>;
    /**
     * @see http
     */
    delete<T>(url: string, args: GetParams, auth?: AuthMode): Promise<T>;
    /**
     * Performs an HTTP request with automatic authorization if desired
     * @param method The HTTP Verb
     * @param url The url of the request
     * @param args The query parameters to pass
     * @param body The JSON body to pass
     * @param auth The authentication mode to use
     */
    http<T>(method: string, url: string, args: GetParams, body: unknown | null, auth: AuthMode): Promise<T>;
}
export default JsonApiClient;
