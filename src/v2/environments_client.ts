// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  PaginationCallback,
  GaxCall,
} from 'google-gax';
import * as path from 'path';

import {Transform} from 'stream';
import {RequestType} from 'google-gax/build/src/apitypes';
import * as protos from '../../protos/protos';
import * as gapicConfig from './environments_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Manages agent environments.
 * @class
 * @memberof v2
 */
export class EnvironmentsClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  environmentsStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of EnvironmentsClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof EnvironmentsClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;

    // users can override the config from client side, like retry codes name.
    // The detailed structure of the clientConfig can be found here: https://github.com/googleapis/gax-nodejs/blob/master/src/gax.ts#L546
    // The way to override client config for Showcase API:
    //
    // const customConfig = {"interfaces": {"google.showcase.v1beta1.Echo": {"methods": {"Echo": {"retry_codes_name": "idempotent", "retry_params_name": "default"}}}}}
    // const showcaseClient = new showcaseClient({ projectId, customConfig });
    opts.clientConfig = opts.clientConfig || {};

    // If we're running in browser, it's OK to omit `fallback` since
    // google-gax has `browser` field in its `package.json`.
    // For Electron (which does not respect `browser` field),
    // pass `{fallback: true}` to the EnvironmentsClient constructor.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof EnvironmentsClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback
        ? // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../protos/protos.json')
        : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      agentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent'
      ),
      entityTypePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/entityTypes/{entity_type}'
      ),
      environmentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/environments/{environment}'
      ),
      intentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/intents/{intent}'
      ),
      projectPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}'
      ),
      projectAgentEnvironmentUserSessionContextPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/environments/{environment}/users/{user}/sessions/{session}/contexts/{context}'
      ),
      projectAgentEnvironmentUserSessionEntityTypePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/environments/{environment}/users/{user}/sessions/{session}/entityTypes/{entity_type}'
      ),
      projectAgentSessionContextPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/sessions/{session}/contexts/{context}'
      ),
      projectAgentSessionEntityTypePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/sessions/{session}/entityTypes/{entity_type}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this.descriptors.page = {
      listEnvironments: new this._gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'environments'
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.dialogflow.v2.Environments',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.environmentsStub) {
      return this.environmentsStub;
    }

    // Put together the "service stub" for
    // google.cloud.dialogflow.v2.Environments.
    this.environmentsStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.dialogflow.v2.Environments'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.dialogflow.v2.Environments,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const environmentsStubMethods = ['listEnvironments'];
    for (const methodName of environmentsStubMethods) {
      const callPromise = this.environmentsStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        this.descriptors.page[methodName] ||
          this.descriptors.stream[methodName] ||
          this.descriptors.longrunning[methodName]
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.environmentsStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/dialogflow',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------

  listEnvironments(
    request: protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.dialogflow.v2.IEnvironment[],
      protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest | null,
      protos.google.cloud.dialogflow.v2.IListEnvironmentsResponse
    ]
  >;
  listEnvironments(
    request: protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
    options: gax.CallOptions,
    callback: PaginationCallback<
      protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
      | protos.google.cloud.dialogflow.v2.IListEnvironmentsResponse
      | null
      | undefined,
      protos.google.cloud.dialogflow.v2.IEnvironment
    >
  ): void;
  listEnvironments(
    request: protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
    callback: PaginationCallback<
      protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
      | protos.google.cloud.dialogflow.v2.IListEnvironmentsResponse
      | null
      | undefined,
      protos.google.cloud.dialogflow.v2.IEnvironment
    >
  ): void;
  /**
   * Returns the list of all non-draft environments of the specified agent.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The agent to list all environments from.
   *   Format: `projects/<Project ID>/agent`.
   * @param {number} [request.pageSize]
   *   Optional. The maximum number of items to return in a single page. By default 100 and
   *   at most 1000.
   * @param {string} [request.pageToken]
   *   Optional. The next_page_token value returned from a previous list request.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [Environment]{@link google.cloud.dialogflow.v2.Environment}.
   *   The client library support auto-pagination by default: it will call the API as many
   *   times as needed and will merge results from all the pages into this array.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [Environment]{@link google.cloud.dialogflow.v2.Environment} that corresponds to
   *   the one page received from the API server.
   *   If the second element is not null it contains the request object of type [ListEnvironmentsRequest]{@link google.cloud.dialogflow.v2.ListEnvironmentsRequest}
   *   that can be used to obtain the next page of the results.
   *   If it is null, the next page does not exist.
   *   The third element contains the raw response received from the API server. Its type is
   *   [ListEnvironmentsResponse]{@link google.cloud.dialogflow.v2.ListEnvironmentsResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listEnvironments(
    request: protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | PaginationCallback<
          protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
          | protos.google.cloud.dialogflow.v2.IListEnvironmentsResponse
          | null
          | undefined,
          protos.google.cloud.dialogflow.v2.IEnvironment
        >,
    callback?: PaginationCallback<
      protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
      | protos.google.cloud.dialogflow.v2.IListEnvironmentsResponse
      | null
      | undefined,
      protos.google.cloud.dialogflow.v2.IEnvironment
    >
  ): Promise<
    [
      protos.google.cloud.dialogflow.v2.IEnvironment[],
      protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest | null,
      protos.google.cloud.dialogflow.v2.IListEnvironmentsResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    this.initialize();
    return this.innerApiCalls.listEnvironments(request, options, callback);
  }

  /**
   * Equivalent to {@link listEnvironments}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listEnvironments} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The agent to list all environments from.
   *   Format: `projects/<Project ID>/agent`.
   * @param {number} [request.pageSize]
   *   Optional. The maximum number of items to return in a single page. By default 100 and
   *   at most 1000.
   * @param {string} [request.pageToken]
   *   Optional. The next_page_token value returned from a previous list request.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits an object representing [Environment]{@link google.cloud.dialogflow.v2.Environment} on 'data' event.
   */
  listEnvironmentsStream(
    request?: protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
    options?: gax.CallOptions
  ): Transform {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    const callSettings = new gax.CallSettings(options);
    this.initialize();
    return this.descriptors.page.listEnvironments.createStream(
      this.innerApiCalls.listEnvironments as gax.GaxCall,
      request,
      callSettings
    );
  }

  /**
   * Equivalent to {@link listEnvironments}, but returns an iterable object.
   *
   * for-await-of syntax is used with the iterable to recursively get response element on-demand.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The agent to list all environments from.
   *   Format: `projects/<Project ID>/agent`.
   * @param {number} [request.pageSize]
   *   Optional. The maximum number of items to return in a single page. By default 100 and
   *   at most 1000.
   * @param {string} [request.pageToken]
   *   Optional. The next_page_token value returned from a previous list request.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Object}
   *   An iterable Object that conforms to @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols.
   */
  listEnvironmentsAsync(
    request?: protos.google.cloud.dialogflow.v2.IListEnvironmentsRequest,
    options?: gax.CallOptions
  ): AsyncIterable<protos.google.cloud.dialogflow.v2.IEnvironment> {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    options = options || {};
    const callSettings = new gax.CallSettings(options);
    this.initialize();
    return this.descriptors.page.listEnvironments.asyncIterate(
      this.innerApiCalls['listEnvironments'] as GaxCall,
      (request as unknown) as RequestType,
      callSettings
    ) as AsyncIterable<protos.google.cloud.dialogflow.v2.IEnvironment>;
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified agent resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  agentPath(project: string) {
    return this.pathTemplates.agentPathTemplate.render({
      project: project,
    });
  }

  /**
   * Parse the project from Agent resource.
   *
   * @param {string} agentName
   *   A fully-qualified path representing Agent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromAgentName(agentName: string) {
    return this.pathTemplates.agentPathTemplate.match(agentName).project;
  }

  /**
   * Return a fully-qualified entityType resource name string.
   *
   * @param {string} project
   * @param {string} entity_type
   * @returns {string} Resource name string.
   */
  entityTypePath(project: string, entityType: string) {
    return this.pathTemplates.entityTypePathTemplate.render({
      project: project,
      entity_type: entityType,
    });
  }

  /**
   * Parse the project from EntityType resource.
   *
   * @param {string} entityTypeName
   *   A fully-qualified path representing EntityType resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromEntityTypeName(entityTypeName: string) {
    return this.pathTemplates.entityTypePathTemplate.match(entityTypeName)
      .project;
  }

  /**
   * Parse the entity_type from EntityType resource.
   *
   * @param {string} entityTypeName
   *   A fully-qualified path representing EntityType resource.
   * @returns {string} A string representing the entity_type.
   */
  matchEntityTypeFromEntityTypeName(entityTypeName: string) {
    return this.pathTemplates.entityTypePathTemplate.match(entityTypeName)
      .entity_type;
  }

  /**
   * Return a fully-qualified environment resource name string.
   *
   * @param {string} project
   * @param {string} environment
   * @returns {string} Resource name string.
   */
  environmentPath(project: string, environment: string) {
    return this.pathTemplates.environmentPathTemplate.render({
      project: project,
      environment: environment,
    });
  }

  /**
   * Parse the project from Environment resource.
   *
   * @param {string} environmentName
   *   A fully-qualified path representing Environment resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromEnvironmentName(environmentName: string) {
    return this.pathTemplates.environmentPathTemplate.match(environmentName)
      .project;
  }

  /**
   * Parse the environment from Environment resource.
   *
   * @param {string} environmentName
   *   A fully-qualified path representing Environment resource.
   * @returns {string} A string representing the environment.
   */
  matchEnvironmentFromEnvironmentName(environmentName: string) {
    return this.pathTemplates.environmentPathTemplate.match(environmentName)
      .environment;
  }

  /**
   * Return a fully-qualified intent resource name string.
   *
   * @param {string} project
   * @param {string} intent
   * @returns {string} Resource name string.
   */
  intentPath(project: string, intent: string) {
    return this.pathTemplates.intentPathTemplate.render({
      project: project,
      intent: intent,
    });
  }

  /**
   * Parse the project from Intent resource.
   *
   * @param {string} intentName
   *   A fully-qualified path representing Intent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromIntentName(intentName: string) {
    return this.pathTemplates.intentPathTemplate.match(intentName).project;
  }

  /**
   * Parse the intent from Intent resource.
   *
   * @param {string} intentName
   *   A fully-qualified path representing Intent resource.
   * @returns {string} A string representing the intent.
   */
  matchIntentFromIntentName(intentName: string) {
    return this.pathTemplates.intentPathTemplate.match(intentName).intent;
  }

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  projectPath(project: string) {
    return this.pathTemplates.projectPathTemplate.render({
      project: project,
    });
  }

  /**
   * Parse the project from Project resource.
   *
   * @param {string} projectName
   *   A fully-qualified path representing Project resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectName(projectName: string) {
    return this.pathTemplates.projectPathTemplate.match(projectName).project;
  }

  /**
   * Return a fully-qualified projectAgentEnvironmentUserSessionContext resource name string.
   *
   * @param {string} project
   * @param {string} environment
   * @param {string} user
   * @param {string} session
   * @param {string} context
   * @returns {string} Resource name string.
   */
  projectAgentEnvironmentUserSessionContextPath(
    project: string,
    environment: string,
    user: string,
    session: string,
    context: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionContextPathTemplate.render(
      {
        project: project,
        environment: environment,
        user: user,
        session: session,
        context: context,
      }
    );
  }

  /**
   * Parse the project from ProjectAgentEnvironmentUserSessionContext resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionContextName
   *   A fully-qualified path representing project_agent_environment_user_session_context resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectAgentEnvironmentUserSessionContextName(
    projectAgentEnvironmentUserSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionContextPathTemplate.match(
      projectAgentEnvironmentUserSessionContextName
    ).project;
  }

  /**
   * Parse the environment from ProjectAgentEnvironmentUserSessionContext resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionContextName
   *   A fully-qualified path representing project_agent_environment_user_session_context resource.
   * @returns {string} A string representing the environment.
   */
  matchEnvironmentFromProjectAgentEnvironmentUserSessionContextName(
    projectAgentEnvironmentUserSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionContextPathTemplate.match(
      projectAgentEnvironmentUserSessionContextName
    ).environment;
  }

  /**
   * Parse the user from ProjectAgentEnvironmentUserSessionContext resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionContextName
   *   A fully-qualified path representing project_agent_environment_user_session_context resource.
   * @returns {string} A string representing the user.
   */
  matchUserFromProjectAgentEnvironmentUserSessionContextName(
    projectAgentEnvironmentUserSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionContextPathTemplate.match(
      projectAgentEnvironmentUserSessionContextName
    ).user;
  }

  /**
   * Parse the session from ProjectAgentEnvironmentUserSessionContext resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionContextName
   *   A fully-qualified path representing project_agent_environment_user_session_context resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromProjectAgentEnvironmentUserSessionContextName(
    projectAgentEnvironmentUserSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionContextPathTemplate.match(
      projectAgentEnvironmentUserSessionContextName
    ).session;
  }

  /**
   * Parse the context from ProjectAgentEnvironmentUserSessionContext resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionContextName
   *   A fully-qualified path representing project_agent_environment_user_session_context resource.
   * @returns {string} A string representing the context.
   */
  matchContextFromProjectAgentEnvironmentUserSessionContextName(
    projectAgentEnvironmentUserSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionContextPathTemplate.match(
      projectAgentEnvironmentUserSessionContextName
    ).context;
  }

  /**
   * Return a fully-qualified projectAgentEnvironmentUserSessionEntityType resource name string.
   *
   * @param {string} project
   * @param {string} environment
   * @param {string} user
   * @param {string} session
   * @param {string} entity_type
   * @returns {string} Resource name string.
   */
  projectAgentEnvironmentUserSessionEntityTypePath(
    project: string,
    environment: string,
    user: string,
    session: string,
    entityType: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionEntityTypePathTemplate.render(
      {
        project: project,
        environment: environment,
        user: user,
        session: session,
        entity_type: entityType,
      }
    );
  }

  /**
   * Parse the project from ProjectAgentEnvironmentUserSessionEntityType resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionEntityTypeName
   *   A fully-qualified path representing project_agent_environment_user_session_entity_type resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectAgentEnvironmentUserSessionEntityTypeName(
    projectAgentEnvironmentUserSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionEntityTypePathTemplate.match(
      projectAgentEnvironmentUserSessionEntityTypeName
    ).project;
  }

  /**
   * Parse the environment from ProjectAgentEnvironmentUserSessionEntityType resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionEntityTypeName
   *   A fully-qualified path representing project_agent_environment_user_session_entity_type resource.
   * @returns {string} A string representing the environment.
   */
  matchEnvironmentFromProjectAgentEnvironmentUserSessionEntityTypeName(
    projectAgentEnvironmentUserSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionEntityTypePathTemplate.match(
      projectAgentEnvironmentUserSessionEntityTypeName
    ).environment;
  }

  /**
   * Parse the user from ProjectAgentEnvironmentUserSessionEntityType resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionEntityTypeName
   *   A fully-qualified path representing project_agent_environment_user_session_entity_type resource.
   * @returns {string} A string representing the user.
   */
  matchUserFromProjectAgentEnvironmentUserSessionEntityTypeName(
    projectAgentEnvironmentUserSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionEntityTypePathTemplate.match(
      projectAgentEnvironmentUserSessionEntityTypeName
    ).user;
  }

  /**
   * Parse the session from ProjectAgentEnvironmentUserSessionEntityType resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionEntityTypeName
   *   A fully-qualified path representing project_agent_environment_user_session_entity_type resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromProjectAgentEnvironmentUserSessionEntityTypeName(
    projectAgentEnvironmentUserSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionEntityTypePathTemplate.match(
      projectAgentEnvironmentUserSessionEntityTypeName
    ).session;
  }

  /**
   * Parse the entity_type from ProjectAgentEnvironmentUserSessionEntityType resource.
   *
   * @param {string} projectAgentEnvironmentUserSessionEntityTypeName
   *   A fully-qualified path representing project_agent_environment_user_session_entity_type resource.
   * @returns {string} A string representing the entity_type.
   */
  matchEntityTypeFromProjectAgentEnvironmentUserSessionEntityTypeName(
    projectAgentEnvironmentUserSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentEnvironmentUserSessionEntityTypePathTemplate.match(
      projectAgentEnvironmentUserSessionEntityTypeName
    ).entity_type;
  }

  /**
   * Return a fully-qualified projectAgentSessionContext resource name string.
   *
   * @param {string} project
   * @param {string} session
   * @param {string} context
   * @returns {string} Resource name string.
   */
  projectAgentSessionContextPath(
    project: string,
    session: string,
    context: string
  ) {
    return this.pathTemplates.projectAgentSessionContextPathTemplate.render({
      project: project,
      session: session,
      context: context,
    });
  }

  /**
   * Parse the project from ProjectAgentSessionContext resource.
   *
   * @param {string} projectAgentSessionContextName
   *   A fully-qualified path representing project_agent_session_context resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectAgentSessionContextName(
    projectAgentSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentSessionContextPathTemplate.match(
      projectAgentSessionContextName
    ).project;
  }

  /**
   * Parse the session from ProjectAgentSessionContext resource.
   *
   * @param {string} projectAgentSessionContextName
   *   A fully-qualified path representing project_agent_session_context resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromProjectAgentSessionContextName(
    projectAgentSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentSessionContextPathTemplate.match(
      projectAgentSessionContextName
    ).session;
  }

  /**
   * Parse the context from ProjectAgentSessionContext resource.
   *
   * @param {string} projectAgentSessionContextName
   *   A fully-qualified path representing project_agent_session_context resource.
   * @returns {string} A string representing the context.
   */
  matchContextFromProjectAgentSessionContextName(
    projectAgentSessionContextName: string
  ) {
    return this.pathTemplates.projectAgentSessionContextPathTemplate.match(
      projectAgentSessionContextName
    ).context;
  }

  /**
   * Return a fully-qualified projectAgentSessionEntityType resource name string.
   *
   * @param {string} project
   * @param {string} session
   * @param {string} entity_type
   * @returns {string} Resource name string.
   */
  projectAgentSessionEntityTypePath(
    project: string,
    session: string,
    entityType: string
  ) {
    return this.pathTemplates.projectAgentSessionEntityTypePathTemplate.render({
      project: project,
      session: session,
      entity_type: entityType,
    });
  }

  /**
   * Parse the project from ProjectAgentSessionEntityType resource.
   *
   * @param {string} projectAgentSessionEntityTypeName
   *   A fully-qualified path representing project_agent_session_entity_type resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectAgentSessionEntityTypeName(
    projectAgentSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentSessionEntityTypePathTemplate.match(
      projectAgentSessionEntityTypeName
    ).project;
  }

  /**
   * Parse the session from ProjectAgentSessionEntityType resource.
   *
   * @param {string} projectAgentSessionEntityTypeName
   *   A fully-qualified path representing project_agent_session_entity_type resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromProjectAgentSessionEntityTypeName(
    projectAgentSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentSessionEntityTypePathTemplate.match(
      projectAgentSessionEntityTypeName
    ).session;
  }

  /**
   * Parse the entity_type from ProjectAgentSessionEntityType resource.
   *
   * @param {string} projectAgentSessionEntityTypeName
   *   A fully-qualified path representing project_agent_session_entity_type resource.
   * @returns {string} A string representing the entity_type.
   */
  matchEntityTypeFromProjectAgentSessionEntityTypeName(
    projectAgentSessionEntityTypeName: string
  ) {
    return this.pathTemplates.projectAgentSessionEntityTypePathTemplate.match(
      projectAgentSessionEntityTypeName
    ).entity_type;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.environmentsStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
