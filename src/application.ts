import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

// ---------- ADD IMPORTS -------------
import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {JWTAuthenticationComponent, SECURITY_SCHEME_SPEC, UserServiceBindings} from '@loopback/authentication-jwt';
import {BlitzDataSource} from './datasources';
import {JWTAuthenticationStrategy} from './strategies/jwt-strategy';
// ------------------------------------

export {ApplicationConfig};

export class BlitzDispatchApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // dotenv configuration
    require('dotenv').config();

    //...
    // ------ ADD SNIPPET AT THE BOTTOM ---------
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.dataSource(BlitzDataSource, UserServiceBindings.DATASOURCE_NAME);
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
    // ------------- END OF SNIPPET -------------

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Set up the security spec for swagger
    this.api({
      openapi: '3.0.0',
      info: {title: 'blitz-dispatch', version: '1.0.0'},
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [
        {
          jwt: [],
        },
      ],
      servers: [{url: '/'}],
    });
  }
}
