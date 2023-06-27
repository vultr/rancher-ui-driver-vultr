/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver from 'shared/mixins/node-driver';

// import uiConstants from 'ui/utils/constants'

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed = Ember.computed;
const get = Ember.get;
const set = Ember.set;
const alias = Ember.computed.alias;
const service = Ember.inject.service;

/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/



/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
  driverName: '%%DRIVERNAME%%',
  needAPIToken: true,
  config: alias('model.%%DRIVERNAME%%Config'),
  app: service(),

  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });
    set(this, 'layout', template);

    this._super(...arguments);

  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap: function () {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      additionalKey: [],
	  "apiKey": "",
	  "appId": "0",
	  "cloudInitUserData": "",
	  "ddosProtection": false,
	  "enableVpc": false,
	  "enabledIpv6": false,
	  "firewallGroupId": "",
	  "floatingIpv4Id": "",
	  "imageId": "",
	  "ipxeChainUrl": "",
	  "isoId": "",
	  "osId": 387,
	  "region": "ewr",
	  "sendActivationEmail": false,
	  "snapshotId": "",
	  "sshKeyIds": null,
	  "tmpSshKeyIds": null,
	  "startupScriptId": "",
	  "tmpTags": null,
	  "tags": null,
	  "tmpVpcIds": null,
	  "vpcIds": null,
	  "vpsBackups": false,
	  "vpsPlan": "vc2-1c-2gb"
    });

    set(this, 'model.%%DRIVERNAME%%Config', config);
  },

  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();

    if (!this.get('model.%%DRIVERNAME%%Config.additionalKey')) {
      this.set('model.%%DRIVERNAME%%Config.additionalKey', [])
    }

    var errors = get(this, 'errors') || [];
    if (!get(this, 'model.name')) {
      errors.push('Name is required');
    }

    // Set the array of errors for display,
    // and return true if saving should continue.
    if (get(errors, 'length')) {
      set(this, 'errors', errors);
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },
  actions: {
    getData() {
      this.set('gettingData', true);
      let that = this;
      Promise.all([this.apiRequest('/v2/regions'), this.apiRequest('/v2/regions/ewr/availability'), this.apiRequest('/v2/os')]).then(function (responses) {
        that.setProperties({
          errors: [],
          needAPIToken: false,
          gettingData: false,
          regionChoices: responses[0].regions,
		  planChoices: responses[1].available_plans,
		  osChoices: responses[2].os
        });
      }).catch(function (err) {
        err.then(function (msg) {
          that.setProperties({
            errors: ['Error received from Vultr: ' + msg.error.message],
            gettingData: false
          })
        })
      })
    },
	setSsh: function (value) {
		let sshArray = value.split(',');
		this.set('model.%%DRIVERNAME%%Config.sshKeyIds', sshArray);
	},
	setTags: function (value) {
		let tagArray = value.split(',');
		this.set('model.%%DRIVERNAME%%Config.tags', tagArray);
	},
	setVpc: function (value) {
		let vpcArray = value.split(',');
		this.set('model.%%DRIVERNAME%%Config.vpcIds', vpcArray);
	},
    setLabels: function(labels){
      let labels_list = labels.map(l => l.key + "=" + l.value);
      this.set('model.%%DRIVERNAME%%Config.serverLabel', labels_list);

      this._super(labels);
    },
    modifyKeys: function (select) {
      let options = [...select.target.options]
        .filter(o => o.selected)
        .map(o => this.keyChoices.find(keyChoice => keyChoice.id == o.value)["public_key"]);
      this.set('model.%%DRIVERNAME%%Config.additionalKey', options);
    },
  },
  apiRequest(path) {
    return fetch('https://rancher-proxy.vultrlabs.dev' + path).then(res => res.ok ? res.json() : Promise.reject(res.json()));
  }
});