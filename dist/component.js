"use strict";

define("nodes/components/driver-vultr/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjaWYgbmVlZEFQSVRva2VufX0KICA8Zm9ybT4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgci1tYjIwIj4KICAgICAgPHNwYW4+QWNjb3VudCBBY2Nlc3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+QVBJIEtleSo8L2xhYmVsPgogICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLmFwaUtleSBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIHBsYWNlaG9sZGVyPSJZb3VyIFZ1bHRyIEFQSSBUb2tlbiJ9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DcmVhdGUgaXQgYnkgc3dpdGNoaW5nIGludG8gdGhlCiAgICAgICAgICA8YSB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIiBocmVmPSJodHRwczovL215LnZ1bHRyLmNvbS9zZXR0aW5ncy8jc2V0dGluZ3NhcGkiPlZ1bHRyIFNldHRpbmdzPC9hPiBhbmQgY3JlYXRlIGEgbmV3IEFQSSB0b2tlbiB0aGVyZS48L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICA8ZGl2IGNsYXNzPSJmb290ZXItYWN0aW9ucyI+CiAgICAgIHt7I2lmIGdldHRpbmdEYXRhfX0KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJnLXByaW1hcnkgYnRuLWRpc2FibGVkIj4KICAgICAgICA8aSBjbGFzcz0iaWNvbiBpY29uLXNwaW5uZXIgaWNvbi1zcGluIj48L2k+IHt7dCAnZ2VuZXJpYy5sb2FkaW5nJ319PC9idXR0b24+CiAgICAgIHt7ZWxzZX19CiAgICAgIDxidXR0b24ge3thY3Rpb24gImdldERhdGEiIH19IGNsYXNzPSJidG4gYmctcHJpbWFyeSIgZGlzYWJsZWQ9e3tub3QgbW9kZWwudnVsdHJDb25maWcuYXBpS2V5fX0+Q29uZmlndXJlIFNlcnZlcjwvYnV0dG9uPgogICAgICB7ey9pZn19CiAgICAgIDxidXR0b24ge3thY3Rpb24gImNhbmNlbCJ9fSBjbGFzcz0iYnRuIGJnLXRyYW5zcGFyZW50Ij57e3QgJ2dlbmVyaWMuY2FuY2VsJ319PC9idXR0b24+CiAgICA8L2Rpdj4KICA8L2Zvcm0+CiAge3tlbHNlfX0KICA8ZGl2IGNsYXNzPSJjb250YWluZXItZmx1aWQiPgogICAge3shLS0gVGhpcyBwYXJ0aWFsIGNvbnRhaW5zIHRoZSBxdWFudGl0eSwgbmFtZSwgYW5kIGRlc2NyaXB0aW9uIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIHItbXQyMCByLW1iMjAiPgogICAgICA8c3Bhbj5TZXR0aW5nczwvc3Bhbj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlJlZ2lvbjwvbGFiZWw+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLnZ1bHRyQ29uZmlnLnJlZ2lvbikgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICB7eyNlYWNoIHJlZ2lvbkNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLmlkfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC52dWx0ckNvbmZpZy5yZWdpb24gY2hvaWNlLmlkfX0+e3tjaG9pY2UuY2l0eX19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CgkgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5QbGFuPC9sYWJlbD4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwudnVsdHJDb25maWcudnBzUGxhbikgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICB7eyNlYWNoIHBsYW5DaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZX19IHNlbGVjdGVkPXt7ZXEgbW9kZWwudnVsdHJDb25maWcudnBzUGxhbiBjaG9pY2V9fT57e2Nob2ljZX19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCTxkaXYgY2xhc3M9InJvdyI+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5UYWdzIHlvdSdkIGxpa2UgdG8gYXR0YWNoIHRvIHRoaXMgcmVzb3VyY2UgKGNvbW1hIHNlcGVyYXRlZCk8L2xhYmVsPgoJCQk8aW5wdXQgYXV0b2NvbXBsZXRlPSJvZmYiIGF1dG9jYXBpdGFsaXplPSJub25lIiBjbGFzcz0iZW1iZXItdGV4dC1maWVsZCBlbWJlci12aWV3IiB0eXBlPSJ0ZXh0IiB2YWx1ZT17e21vZGVsLnZ1bHRyQ29uZmlnLnRtcFRhZ3N9fSBvbmNoYW5nZT17e2FjdGlvbiAnc2V0VGFncycgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0gLz4KCQk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPk9wZXJhdGluZyBzeXN0ZW0gSUQgKGRlZmF1bHQ6IFszODddIFVidW50dSAyMC4wNCk8L2xhYmVsPgogICAgICAgIAk8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwudnVsdHJDb25maWcub3NJZCkgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICAJe3sjZWFjaCBvc0Nob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICAJPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5pZH19IHNlbGVjdGVkPXt7ZXEgbW9kZWwudnVsdHJDb25maWcub3NJZCBjaG9pY2UuaWR9fT57e2Nob2ljZS5pZH19IC0ge3tjaG9pY2UubmFtZX19PC9vcHRpb24+CiAgICAgICAgICAJe3svZWFjaH19CiAgICAgICAgCTwvc2VsZWN0PgogICAgICA8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93Ij4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPklTTyBJRCB5b3UnZCBsaWtlIHRvIGJvb3QgdGhpcyByZXNvdXJjZSBpbnRvPC9sYWJlbD4KCQkJe3tpbnB1dCB0eXBlPSJudW1iZXIiIHZhbHVlPW1vZGVsLnZ1bHRyQ29uZmlnLmlzb0lkIH19CgkJPC9kaXY+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5BcHAgSUQgb2YgdGhlIFZ1bHRyIE1hcmtldHBsYWNlIEFwcCB0byBkZXBsb3kgdG8gdGhpcyByZXNvdXJjZTwvbGFiZWw+CgkJCXt7aW5wdXQgdHlwZT0ibnVtYmVyIiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5hcHBJZCBwbGFjZWhvbGRlcj0iMCIgfX0KCQk8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93Ij4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlZQQyBJRHMgeW91IHdhbnQgdG8gYXR0YWNoIHRvIHRoaXMgcmVzb3VyY2UgKGNvbW1hIHNlcGVyYXRlZCk8L2xhYmVsPgoJCQk8aW5wdXQgYXV0b2NvbXBsZXRlPSJvZmYiIGF1dG9jYXBpdGFsaXplPSJub25lIiBjbGFzcz0iZW1iZXItdGV4dC1maWVsZCBlbWJlci12aWV3IiB0eXBlPSJ0ZXh0IiB2YWx1ZT17e21vZGVsLnZ1bHRyQ29uZmlnLnRtcFZwY0lkc319IG9uY2hhbmdlPXt7YWN0aW9uICdzZXRWcGMnIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19IC8+CgkgIAk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlNTSCBLZXkgSURzIHlvdSdkIGxpa2UgaW5zdGFsbGVkIG9uIHRoaXMgcmVzb3VyY2UgKGNvbW1hIHNlcGVyYXRlZCk8L2xhYmVsPgoJCQk8aW5wdXQgYXV0b2NvbXBsZXRlPSJvZmYiIGF1dG9jYXBpdGFsaXplPSJub25lIiBjbGFzcz0iZW1iZXItdGV4dC1maWVsZCBlbWJlci12aWV3IiB0eXBlPSJ0ZXh0IiB2YWx1ZT17e21vZGVsLnZ1bHRyQ29uZmlnLnRtcFNzaEtleUlkc319IG9uY2hhbmdlPXt7YWN0aW9uICdzZXRTc2gnIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19IC8+CgkgIAk8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93Ij4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPklQWEUgQ2hhaW4gVVJMIHlvdSdkIGxpa2UgdG8gYm9vdCB0aGlzIHJlc291cmNlIHRvPC9sYWJlbD4KCQkJe3tpbnB1dCB0eXBlPSJ0ZXh0IiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5pcHhlQ2hhaW5VcmwgfX0KCQk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlN0YXJ0dXAgU2NyaXB0IElEIHZvdSdkIGxpa2UgdG8gcnVuIG9uIHRoaXMgcmVzb3VyY2UgYWZ0ZXIgYm9vdDwvbGFiZWw+CgkJCXt7aW5wdXQgdHlwZT0ibnVtYmVyIiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5zdGFydHVwU2NyaXB0SWQgfX0KCQk8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93Ij4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwudnVsdHJDb25maWcudnBzQmFja3VwcyB9fQoJCQkJRW5hYmxlIGF1dG9tYXRpYyBiYWNrdXBzIG9mIHRoaXMgVlBTCgkJCTwvbGFiZWw+CgkJPC9kaXY+CgkJPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CgkJCTxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj57e2lucHV0IHR5cGU9ImNoZWNrYm94IiBjaGVja2VkPW1vZGVsLnZ1bHRyQ29uZmlnLmRkb3NQcm90ZWN0aW9ufX0KCQkJCUVuYWJsZSBERE9TIFByb3RlY3Rpb24KCQkJPC9sYWJlbD4KCQk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwudnVsdHJDb25maWcuc2VuZEFjdGl2YXRpb25FbWFpbH19CgkJCQlTZW5kIEFjdGl2YXRpb24gRW1haWwKCQkJPC9sYWJlbD4KCQk8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93Ij4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KCQkJPGRpdiBjbGFzcz0iY2hlY2tib3giPgoJCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwudnVsdHJDb25maWcuZW5hYmxlZElwdjZ9fQoJCQkJCUVuYWJsZSBJUHY2CgkJCQk8L2xhYmVsPgoJCQk8L2Rpdj4KCQk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KCQkJPGRpdiBjbGFzcz0iY2hlY2tib3giPgoJCQkJPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwudnVsdHJDb25maWcuZW5hYmxlVnBjfX0KCQkJCQlFbmFibGUgVlBDCgkJCQk8L2xhYmVsPgoJCQk8L2Rpdj4KCQk8L2Rpdj4KCTwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlBhc3MgYmFzZTY0IGVuY29kZWQgY2xvdWQtaW5pdCB1c2VyIGRhdGEgdG8gdGhpcyByZXNvdXJjZTwvbGFiZWw+CiAgICAgICAgPHRleHRhcmVhIHZhbHVlPXt7bW9kZWwudnVsdHJDb25maWcuY2xvdWRJbml0VXNlckRhdGF9fSBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLnZ1bHRyQ29uZmlnLmNsb3VkSW5pdFVzZXJEYXRhKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fSByb3dzPSIxIiBzdHlsZT0id2lkdGg6IDEwMCU7IHJlc2l6ZTogdmVydGljYWwiPjwvdGV4dGFyZWE+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+RmlyZXdhbGwgR3JvdXAgSUQgeW91J2QgbGlrZSB0byBhdHRhY2ggdGhpcyByZXNvdXJjZSB0bzwvbGFiZWw+CgkJe3tpbnB1dCB0eXBlPSJ0ZXh0IiB2YWx1ZT1tb2RlbC52dWx0ckNvbmZpZy5maXJld2FsbEdyb3VwSWQgfX0KCSAgPC9kaXY+CiAgICA8L2Rpdj4KCSA8ZGl2IGNsYXNzPSJyb3ciPgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SUQgb2YgdGhlIGZsb2F0aW5nL3Jlc2VydmVkIElQVjQgYWRkcmVzcyB0byB1c2UgYXMgdGhlIG1haW4gSVAgb2YgdGhpcyByZXNvdXJjZTwvbGFiZWw+CgkJCXt7aW5wdXQgdHlwZT0idGV4dCIgdmFsdWU9bW9kZWwudnVsdHJDb25maWcuZmxvYXRpbmdJcHY0SWQgfX0KCSAgCTwvZGl2PgoJCTxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoJCQk8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+U3BlY2lmaWMgSW1hZ2UgSUQgb2YgdGhlIFZ1bHRyIE1hcmtldHBsYWNlIEFwcCB5b3UnZCBsaWtlIHRvIGRlcGxveTwvbGFiZWw+CgkJCXt7aW5wdXQgdHlwZT0idGV4dCIgdmFsdWU9bW9kZWwudnVsdHJDb25maWcuaW1hZ2VJZCB9fQoJICAJPC9kaXY+CgkgPC9kaXY+Cgk8ZGl2IGNsYXNzPSJvdmVyLWhyIj4KICAgIAk8c3Bhbj57e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX08L3NwYW4+CiAgCTwvZGl2PgogICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24gbW9kZWw9bW9kZWwgbmFtZVJlcXVpcmVkPXRydWV9fQogICAgIHt7Zm9ybS11c2VyLWxhYmVscyBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzIHNldExhYmVscz0oYWN0aW9uICdzZXRMYWJlbHMnKSBleHBhbmRBbGw9ZXhwYW5kQWxsIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKSB9fQogICAgIHt7Zm9ybS1lbmdpbmUtb3B0cyBtYWNoaW5lPW1vZGVsIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybCB9fQogICAgIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIGVycm9ycyBwcm9kdWNlZCBieSB2YWxpZGF0ZSgpIGluIHRoZSBjb21wb25lbnQgLS19fQogICAgIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KICAgICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAgICAge3tzYXZlLWNhbmNlbCBzYXZlPSJzYXZlIiBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIil9fQogIDwvZGl2PgogIHt7L2lmfX0KPC9zZWN0aW9uPg==";
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
        "tmpSshKeyIds": null,
        "startupScriptId": "",
        "tmpTags": null,
        "tags": null,
        "tmpVpcIds": null,
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
      setSsh: function (value) {
        let sshArray = value.split(',');
        this.set('model.vultrConfig.sshKeyIds', sshArray);
      },
      setTags: function (value) {
        let tagArray = value.split(',');
        this.set('model.vultrConfig.tags', tagArray);
      },
      setVpc: function (value) {
        let vpcArray = value.split(',');
        this.set('model.vultrConfig.vpcIds', vpcArray);
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