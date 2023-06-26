"use strict";

define("nodes/components/driver-vultr/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjaWYgbmVlZEFQSVRva2VufX0KICA8Zm9ybT4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgci1tYjIwIj4KICAgICAgPHNwYW4+QWNjb3VudCBBY2Nlc3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+QVBJIEtleSo8L2xhYmVsPgogICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLmFwaUtleSBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJZb3VyIFZ1bHRyIEFQSSBUb2tlbiJ9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DcmVhdGUgaXQgYnkgc3dpdGNoaW5nIGludG8gdGhlCiAgICAgICAgICA8YSB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIiBocmVmPSJodHRwczovL215LnZ1bHRyLmNvbS9zZXR0aW5ncy8jc2V0dGluZ3NhcGkiPlZ1bHRyIFNldHRpbmdzPC9hPiBhbmQgY3JlYXRlIGEgbmV3IEFQSSB0b2tlbiB0aGVyZS48L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICA8ZGl2IGNsYXNzPSJmb290ZXItYWN0aW9ucyI+CiAgICAgIHt7I2lmIGdldHRpbmdEYXRhfX0KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJnLXByaW1hcnkgYnRuLWRpc2FibGVkIj4KICAgICAgICA8aSBjbGFzcz0iaWNvbiBpY29uLXNwaW5uZXIgaWNvbi1zcGluIj48L2k+IHt7dCAnZ2VuZXJpYy5sb2FkaW5nJ319PC9idXR0b24+CiAgICAgIHt7ZWxzZX19CiAgICAgIDxidXR0b24ge3thY3Rpb24gImdldERhdGEiIH19IGNsYXNzPSJidG4gYmctcHJpbWFyeSIgZGlzYWJsZWQ9e3tub3QgbW9kZWwudnVsdHJDb25maWcuYXBpS2V5fX0+Q29uZmlndXJlIFNlcnZlcjwvYnV0dG9uPgogICAgICB7ey9pZn19CiAgICAgIDxidXR0b24ge3thY3Rpb24gImNhbmNlbCJ9fSBjbGFzcz0iYnRuIGJnLXRyYW5zcGFyZW50Ij57e3QgJ2dlbmVyaWMuY2FuY2VsJ319PC9idXR0b24+CiAgICA8L2Rpdj4KICA8L2Zvcm0+CiAge3tlbHNlfX0KICA8ZGl2IGNsYXNzPSJjb250YWluZXItZmx1aWQiPgogICAge3shLS0gVGhpcyBwYXJ0aWFsIGNvbnRhaW5zIHRoZSBxdWFudGl0eSwgbmFtZSwgYW5kIGRlc2NyaXB0aW9uIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIHItbXQyMCByLW1iMjAiPgogICAgICA8c3Bhbj5TZXR0aW5nczwvc3Bhbj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlJlZ2lvbjwvbGFiZWw+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLnZ1bHRyQ29uZmlnLnJlZ2lvbikgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICB7eyNlYWNoIHJlZ2lvbkNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLmlkfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC52dWx0ckNvbmZpZy5yZWdpb24gY2hvaWNlLmlkfX0+e3tjaG9pY2UuY2l0eX19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CgkgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5QbGFuPC9sYWJlbD4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwudnVsdHJDb25maWcudnBzUGxhbikgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICB7eyNlYWNoIHBsYW5DaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZX19IHNlbGVjdGVkPXt7ZXEgbW9kZWwudnVsdHJDb25maWcudnBzUGxhbiBjaG9pY2V9fT57e2Nob2ljZX19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCTxkaXYgY2xhc3M9InJvdyI+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5UYWdzIHlvdSdkIGxpa2UgdG8gYXR0YWNoIHRvIHRoaXMgcmVzb3VyY2U8L2xhYmVsPgoJCQl7e2lucHV0IHR5cGU9InRleHQiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLnRhZ3MgfX0KCQk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPk9wZXJhdGluZyBzeXN0ZW0gSUQgKGRlZmF1bHQ6IFszODddIFVidW50dSAyMC4wNCk8L2xhYmVsPgogICAgICAgIAk8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwudnVsdHJDb25maWcub3NJZCkgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICAJe3sjZWFjaCBvc0Nob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAJPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5pZH19IHNlbGVjdGVkPXt7ZXEgbW9kZWwudnVsdHJDb25maWcub3NJZCBjaG9pY2UuaWR9fT57e2Nob2ljZS5pZH19IC0ge3tjaG9pY2UubmFtZX19PC9vcHRpb24+CiAgICAgICAgICAJe3svZWFjaH19CiAgICAgICAgCTwvc2VsZWN0PgogICAgICA8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93Ij4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPklTTyBJRCB5b3UnZCBsaWtlIHRvIGJvb3QgdGhpcyByZXNvdXJjZSBpbnRvPC9sYWJlbD4KCQkJe3tpbnB1dCB0eXBlPSJudW1iZXIiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLmlzb0lkIH19CgkJPC9kaXY+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5BcHAgSUQgb2YgdGhlIFZ1bHRyIE1hcmtldHBsYWNlIEFwcCB0byBkZXBsb3kgdG8gdGhpcyByZXNvdXJjZTwvbGFiZWw+CgkJCXt7aW5wdXQgdHlwZT0ibnVtYmVyIiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5hcHBJZCBwbGFjZWhvbGRlcj0iMCIgfX0KCQk8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93Ij4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlZQQyBJRHMgeW91IHdhbnQgdG8gYXR0YWNoIHRvIHRoaXMgcmVzb3VyY2U8L2xhYmVsPgoJCQl7e2lucHV0IHR5cGU9InRleHQiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLnZwY0lkcyB9fQoJICAJPC9kaXY+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TU0ggS2V5IElEcyB5b3UnZCBsaWtlIGluc3RhbGxlZCBvbiB0aGlzIHJlc291cmNlIChkZWZhdWx0OiBHZW5lcmF0ZWQpPC9sYWJlbD4KCQkJe3tpbnB1dCB0eXBlPSJ0ZXh0IiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5zc2hLZXlJZHMgfX0KCSAgCTwvZGl2PgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJyb3ciPgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SVBYRSBDaGFpbiBVUkwgeW91J2QgbGlrZSB0byBib290IHRoaXMgcmVzb3VyY2UgdG88L2xhYmVsPgoJCQl7e2lucHV0IHR5cGU9InRleHQiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLmlweGVDaGFpblVybCB9fQoJCTwvZGl2PgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+U3RhcnR1cCBTY3JpcHQgSUQgdm91J2QgbGlrZSB0byBydW4gb24gdGhpcyByZXNvdXJjZSBhZnRlciBib290PC9sYWJlbD4KCQkJe3tpbnB1dCB0eXBlPSJudW1iZXIiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLnN0YXJ0dXBTY3JpcHRJZCB9fQoJCTwvZGl2PgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJyb3ciPgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgoJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+e3tpbnB1dCB0eXBlPSJjaGVja2JveCIgY2hlY2tlZD1tb2RlbC52dWx0ckNvbmZpZy52cHNCYWNrdXBzIH19CgkJCQlFbmFibGUgYXV0b21hdGljIGJhY2t1cHMgb2YgdGhpcyBWUFMKCQkJPC9sYWJlbD4KCQk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwudnVsdHJDb25maWcuZGRvc1Byb3RlY3Rpb259fQoJCQkJRW5hYmxlIERET1MgUHJvdGVjdGlvbgoJCQk8L2xhYmVsPgoJCTwvZGl2PgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgoJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+e3tpbnB1dCB0eXBlPSJjaGVja2JveCIgY2hlY2tlZD1tb2RlbC52dWx0ckNvbmZpZy5zZW5kQWN0aXZhdGlvbkVtYWlsfX0KCQkJCVNlbmQgQWN0aXZhdGlvbiBFbWFpbAoJCQk8L2xhYmVsPgoJCTwvZGl2PgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJyb3ciPgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgoJCQk8ZGl2IGNsYXNzPSJjaGVja2JveCI+CgkJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+e3tpbnB1dCB0eXBlPSJjaGVja2JveCIgY2hlY2tlZD1tb2RlbC52dWx0ckNvbmZpZy5lbmFibGVkSXB2Nn19CgkJCQkJRW5hYmxlIElQdjYKCQkJCTwvbGFiZWw+CgkJCTwvZGl2PgoJCTwvZGl2PgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgoJCQk8ZGl2IGNsYXNzPSJjaGVja2JveCI+CgkJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+e3tpbnB1dCB0eXBlPSJjaGVja2JveCIgY2hlY2tlZD1tb2RlbC52dWx0ckNvbmZpZy5lbmFibGVWcGN9fQoJCQkJCUVuYWJsZSBWUEMKCQkJCTwvbGFiZWw+CgkJCTwvZGl2PgoJCTwvZGl2PgoJPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFzcyBiYXNlNjQgZW5jb2RlZCBjbG91ZC1pbml0IHVzZXIgZGF0YSB0byB0aGlzIHJlc291cmNlPC9sYWJlbD4KICAgICAgICA8dGV4dGFyZWEgdmFsdWU9e3ttb2RlbC52dWx0ckNvbmZpZy5jbG91ZEluaXRVc2VyRGF0YX19IG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwudnVsdHJDb25maWcuY2xvdWRJbml0VXNlckRhdGEpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19IHJvd3M9IjEiIHN0eWxlPSJ3aWR0aDogMTAwJTsgcmVzaXplOiB2ZXJ0aWNhbCI+PC90ZXh0YXJlYT4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5GaXJld2FsbCBHcm91cCBJRCB5b3UnZCBsaWtlIHRvIGF0dGFjaCB0aGlzIHJlc291cmNlIHRvPC9sYWJlbD4KCQl7e2lucHV0IHR5cGU9InRleHQiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLmZpcmV3YWxsR3JvdXBJZCB9fQoJICA8L2Rpdj4KICAgIDwvZGl2PgoJIDxkaXYgY2xhc3M9InJvdyI+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JRCBvZiB0aGUgZmxvYXRpbmcvcmVzZXJ2ZWQgSVBWNCBhZGRyZXNzIHRvIHVzZSBhcyB0aGUgbWFpbiBJUCBvZiB0aGlzIHJlc291cmNlPC9sYWJlbD4KCQkJe3tpbnB1dCB0eXBlPSJ0ZXh0IiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5mbG9hdGluZ0lwdjRJZCB9fQoJICAJPC9kaXY+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TcGVjaWZpYyBJbWFnZSBJRCBvZiB0aGUgVnVsdHIgTWFya2V0cGxhY2UgQXBwIHlvdSdkIGxpa2UgdG8gZGVwbG95PC9sYWJlbD4KCQkJe3tpbnB1dCB0eXBlPSJ0ZXh0IiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5pbWFnZUlkIH19CgkgIAk8L2Rpdj4KCSA8L2Rpdj4KCTxkaXYgY2xhc3M9Im92ZXItaHIiPgogICAgCTxzcGFuPnt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fTwvc3Bhbj4KICAJPC9kaXY+CiAgICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgICB7e2Zvcm0tbmFtZS1kZXNjcmlwdGlvbiBtb2RlbD1tb2RlbCBuYW1lUmVxdWlyZWQ9dHJ1ZX19CiAgICAge3tmb3JtLXVzZXItbGFiZWxzIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpIGV4cGFuZEFsbD1leHBhbmRBbGwgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pIH19CiAgICAge3tmb3JtLWVuZ2luZS1vcHRzIG1hY2hpbmU9bW9kZWwgc2hvd0VuZ2luZVVybD1zaG93RW5naW5lVXJsIH19CiAgICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAgICAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQogICAgIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIHRoZSBDcmVhdGUgYW5kIENhbmNlbCBidXR0b25zIC0tfX0KICAgICB7e3NhdmUtY2FuY2VsIHNhdmU9InNhdmUiIGNhbmNlbD0oYWN0aW9uICJjYW5jZWwiKX19CiAgPC9kaXY+CiAge3svaWZ9fQo8L3NlY3Rpb24+";
  const computed = Ember.computed;
  const get = Ember.get;
  const set = Ember.set;
  const alias = Ember.computed.alias;
  const service = Ember.inject.service;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'vultr',
    needAPIToken: true,
    config: alias('model.vultrConfig'),
    app: service(),
    init() {
      const decodedLayout = window.atob(LAYOUT);
      const template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-vultr/template'
      });
      set(this, 'layout', template);
      this._super(...arguments);
    },
    bootstrap: function () {
      let config = get(this, 'globalStore').createRecord({
        type: 'vultrConfig',
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
        "startupScriptId": "",
        "tags": null,
        "vpcIds": null,
        "vpsBackups": false,
        "vpsPlan": "vc2-1c-2gb"
      });
      set(this, 'model.vultrConfig', config);
    },
    validate() {
      this._super();
      if (!this.get('model.vultrConfig.additionalKey')) {
        this.set('model.vultrConfig.additionalKey', []);
      }
      var errors = get(this, 'errors') || [];
      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }
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
            });
          });
        });
      },
      setLabels: function (labels) {
        let labels_list = labels.map(l => l.key + "=" + l.value);
        this.set('model.vultrConfig.serverLabel', labels_list);
        this._super(labels);
      },
      modifyKeys: function (select) {
        let options = [...select.target.options].filter(o => o.selected).map(o => this.keyChoices.find(keyChoice => keyChoice.id == o.value)["public_key"]);
        this.set('model.vultrConfig.additionalKey', options);
      }
    },
    apiRequest(path) {
      return fetch('https://rancher-proxy.vultrlabs.dev' + path).then(res => res.ok ? res.json() : Promise.reject(res.json()));
    }
  });
});;
"use strict";

define("ui/components/driver-vultr/component", ["exports", "nodes/components/driver-vultr/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});