sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {

	"use strict";

	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHR_144_SRV_01");
	var selectPernr;
	var selectPronr;
	var selectAppnr;
	var appnrFilter = "01";
	var firstPernr;
	var firstPronr;
	var not;
	var pronrArray = [];
	var firstAppnr;

	return Controller.extend("ZHR_REQUEST.controller.Request", {

		onInit: function() {
			/*	var sUrl = "#" + this.getOwnerComponent().getRouter().getURL("screen1");

				this.byId("link").setHref(sUrl);*/
			var that = this;
			var oJasonModel = new sap.ui.model.json.JSONModel();
			var filter = "Appnr eq '" + appnrFilter + "' ";

			oModel.read("/ZHRDurumFisiOnaySet", null, ["$filter=" + filter], false,
				function(oData) {
					oJasonModel.setData(oData);
					console.log(oData.results);
					try {
						firstPernr = oData.results[0].Pernr;
						firstPronr = oData.results[0].Pronr;
					} catch (err) {

					}
					for (var i = 0; i < oData.results.length; i++) {
						if (oData.results[i].Pronr === "01") {
							oData.results[i].Pernr = "-";
						}
					}

					/*	firstPernr = oData.results[0].Pernr;
						firstPronr = oData.results[0].Pronr;*/
				});

			that.getView().setModel(oJasonModel, "JasonModel");
			this.getView().byId("talepList").setModel(this.getView().getModel("JasonModel"));

		},
		setDate: function(value) {
			if (value) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "dd.MM.yyyy"
				});
				return oDateFormat.format(new Date(value));
			} else {
				return value;
			}
		},
		formatDate: function(value) {
			var gun, yil, ay, tarih;
			if (value) {
				if (selectPronr === "01") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);

					tarih = gun + "." + ay + "." + yil;

				} else if (selectPronr === "02") {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd.MM.yyyy"
					});
					tarih = oDateFormat.format(new Date(value));
				} else if (selectPronr === "03") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				}
			}
			return tarih;
		},
		firstFormatDate: function(value) {
			var gun, yil, ay, tarih;
			if (value) {
				if (firstPronr === "01") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);

					tarih = gun + "." + ay + "." + yil;

				} else if (firstPronr === "02") {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "dd.MM.yyyy"
					});
					tarih = oDateFormat.format(new Date(value));
				} else if (firstPronr === "03") {
					yil = value.substring(0, 4);
					ay = value.substring(4, 6);
					gun = value.substring(6, 8);
					tarih = gun + "." + ay + "." + yil;
				}
			}
			return tarih;

		},
		setVisible: function(value) {

			var pernr;
			for (var i = 0; i < pronrArray.length; i++) {
				if (value) {
					if (pronrArray[i] === "01") {
						pernr = "-";
					} else if (pronrArray[i] === "02") {
						pernr = value;
					} else if (pronrArray[i] === "03") {
						pernr = value;
					}
					return pernr;

				}
			}

		},
		onAfterRendering: function() {
			var that = this;
			var pozisyon, perAlan, perAltAlan, isAlan, isAnahtar, orgBirim, clsGrup, aracPrim, dilPrim, mevPrim, vekPrim, fisKonu;
			var clsAltGrp, skala, ucret, diger, okulTur, okulAd, egitim, adSoyad, dogumTarih, gecerTarih, sirket, tc, sicil, ayrilma;

			var oLangModel = new sap.ui.model.json.JSONModel();
			var perFilter = "Pernr eq '" + firstPernr + "'";
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + firstPernr + "'";
			var attachModel = new sap.ui.model.json.JSONModel();
			var perAttachFilter = "IvPernr eq '" + firstPernr + "'";
			var langtable = that.getView().byId("idLanguageTable");
			var zbtable = that.getView().byId("idAbilityTable");
			var onayciModel = new sap.ui.model.json.JSONModel();
			firstAppnr = "01";
			var filterOnayci = "Pernr eq '" + firstPernr + "' and  Pronr eq '" + firstPronr + "' and Appnr eq '" + firstAppnr + "'";

			setTimeout(function() {
				if (firstPronr === "01") {
					oModel.read("/ZHRTalepPersonelBilgiSet('" + firstPernr + "')", null, null, true,
						function(oData) {
							/*pozisyon = oData.Plans;
							perAlan = oData.Werks;
							perAltAlan = oData.Btrtl;
							isAlan = oData.Gsber;
							isAnahtar = oData.Stell;
							orgBirim = oData.Orgeh;
							clsGrup = oData.Persg;
							clsAltGrp = oData.Persk;
							skala = oData.Trfgr;
							ucret = oData.Bet01;
							diger = oData.Diger;
							okulTur = oData.Slart;
							okulAd = oData.Insti;
							egitim = oData.Fach1;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = "";
							dilPrim = "";
							mevPrim = "";
							vekPrim = "";
							sirket = "";
							tc = "";
							//sicil = firstPernr;
							fisKonu = "İşe Alım";*/
							pozisyon = oData.Stext;
							perAlan = oData.Pbtxt;
							perAltAlan = oData.Btext;
							isAlan = oData.Gtext;
							isAnahtar = oData.StellTxt;
							orgBirim = oData.OrgehTxt;
							clsGrup = oData.Psgtext;
							clsAltGrp = oData.Psktext;
							skala = oData.Trfgr;
							ucret = oData.Bet01;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = "";
							dilPrim = "";
							mevPrim = "";
							vekPrim = "";
							sirket = "";
							tc = "";
							sicil = "";
							fisKonu = "İşe Alım";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
							that.getView().byId("posApprove").setValue(pozisyon);
							that.getView().byId("perAlanApprove").setValue(perAlan);
							that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
							that.getView().byId("isAlanApprove").setValue(isAlan);
							that.getView().byId("isAnahApprove").setValue(isAnahtar);
							that.getView().byId("orgBrmApprove").setValue(orgBirim);
							that.getView().byId("clsGrpApprove").setValue(clsGrup);
							that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
							that.getView().byId("skalaApprove").setValue(skala);
							that.getView().byId("ucretApprove").setValue(ucret);
							that.getView().byId("digerApprove").setValue(diger);
							that.getView().byId("okulTurApprove").setValue(okulTur);
							that.getView().byId("okulAdApprove").setValue(okulAd);
							that.getView().byId("egitimApprove").setValue(egitim);
							that.getView().byId("sirketApprove").setValue(sirket);
							that.getView().byId("dilPrimApprove").setValue(dilPrim);
							that.getView().byId("aracPrimApprove").setValue(aracPrim);
							that.getView().byId("mevPrimApprove").setValue(mevPrim);
							that.getView().byId("vekPrimApprove").setValue(vekPrim);
							that.getView().byId("tcApprove").setValue(tc);
							that.getView().byId("sicilApprove").setValue(sicil);

							//begin of ycoskun visible false olacaklar 
							that.getView().byId("labelSicil").setVisible(false);
							that.getView().byId("sicilApprove").setVisible(false);
							that.getView().byId("labelDil").setVisible(false);
							that.getView().byId("dilPrimApprove").setVisible(false);
							that.getView().byId("labelArac").setVisible(false);
							that.getView().byId("aracPrimApprove").setVisible(false);
							that.getView().byId("labelMev").setVisible(false);
							that.getView().byId("mevPrimApprove").setVisible(false);
							that.getView().byId("labelVek").setVisible(false);
							that.getView().byId("vekPrimApprove").setVisible(false);
							that.getView().byId("labelTC").setVisible(false);
							that.getView().byId("tcApprove").setVisible(false);
							that.getView().byId("labelSirket").setVisible(false);
							that.getView().byId("sirketApprove").setVisible(false);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("IconTabAttach").setVisible(true);
							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable").setVisible(false);
							that.getView().byId("formPD").setVisible(false);
							//end of ycoskun

						});
					//işe alım personelinin yabancı dillerini getirme

					oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], false,
						function(oData) {
							oLangModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(oLangModel, "LangModel");
					langtable.setModel(that.getView().getModel("LangModel"));

					//işe alım personelinin zihinsel beceri bilgilerini getirme

					oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], false,
						function(oData) {
							oAbModel.setData(oData);

						});
					that.getView().setModel(oAbModel, "oAbModel");
					zbtable.setModel(that.getView().getModel("oAbModel"));

					//işe alım personelinin eklerinin getirilmesi

					oModel.read("/ZHRAttachDisplaySet", null, ["$filter=" + perAttachFilter], false,
						function(oData) {
							attachModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(attachModel, "attachModel");

					//end of ycoskun

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun

				} else if (firstPronr === "02") {
					oModel.read("/ZHRIstenCikisSet('" + firstPernr + "')", null, null, true,
						function(oData) {
							/*	pozisyon = oData.Plans;
								perAlan = oData.Werks;
								perAltAlan = oData.Btrtl;
								isAlan = oData.Gsber;
								isAnahtar = oData.Stell;
								orgBirim = oData.Orgeh;
								clsGrup = oData.Persg;
								clsAltGrp = oData.Persk;
								skala = oData.Trfgr;
								ucret = oData.Ucret;
								diger = oData.Diger;
								okulTur = "";
								okulAd = "";
								egitim = "";
								adSoyad = oData.Ename;
								dogumTarih = oData.Gbdat;
								gecerTarih = oData.Begda;
								aracPrim = oData.Arcpr;
								dilPrim = oData.Dilpr;
								mevPrim = oData.Mvspr;
								vekPrim = oData.Vklpr;
								sirket = oData.Bukrs;
								tc = oData.Tckno;
								sicil = firstPernr;
								fisKonu = "İşten Çıkış";*/
							pozisyon = oData.Stext;
							perAlan = oData.Pbtxt;
							perAltAlan = oData.Btext;
							isAlan = oData.Gtext;
							isAnahtar = oData.StellTxt;
							orgBirim = oData.OrgehTxt;
							clsGrup = oData.Psgtext;
							clsAltGrp = oData.Psktext;
							skala = oData.Trfgr;
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = "";
							okulAd = "";
							egitim = "";
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "İşten Çıkış";
							ayrilma = oData.Mgtxt;

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
							that.getView().byId("posApprove").setValue(pozisyon);
							that.getView().byId("perAlanApprove").setValue(perAlan);
							that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
							that.getView().byId("isAlanApprove").setValue(isAlan);
							that.getView().byId("isAnahApprove").setValue(isAnahtar);
							that.getView().byId("orgBrmApprove").setValue(orgBirim);
							that.getView().byId("clsGrpApprove").setValue(clsGrup);
							that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
							that.getView().byId("skalaApprove").setValue(skala);
							that.getView().byId("ucretApprove").setValue(ucret);
							that.getView().byId("digerApprove").setValue(diger);
							that.getView().byId("okulTurApprove").setValue(okulTur);
							that.getView().byId("okulAdApprove").setValue(okulAd);
							that.getView().byId("egitimApprove").setValue(egitim);
							that.getView().byId("sirketApprove").setValue(sirket);
							that.getView().byId("dilPrimApprove").setValue(dilPrim);
							that.getView().byId("aracPrimApprove").setValue(aracPrim);
							that.getView().byId("mevPrimApprove").setValue(mevPrim);
							that.getView().byId("vekPrimApprove").setValue(vekPrim);
							that.getView().byId("tcApprove").setValue(tc);
							that.getView().byId("sicilApprove").setValue(sicil);

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(false);
							that.getView().byId("okulTurApprove").setVisible(false);
							that.getView().byId("labelOkulAd").setVisible(false);
							that.getView().byId("okulAdApprove").setVisible(false);
							that.getView().byId("labelEgitim").setVisible(false);
							that.getView().byId("egitimApprove").setVisible(false);

							that.getView().byId("IconTabAttach").setVisible(false);
							that.getView().byId("iconTabTable").setVisible(false);
							that.getView().byId("idPDTable").setVisible(false);
							that.getView().byId("formPD").setVisible(false);
							//end of ycoskun

						});

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				} else if (firstPronr === "03") {
					oModel.read("/ZHRTerfiSet('" + firstPernr + "')", null, null, true,
						function(oData) {
							pozisyon = oData.Stext;
							perAlan = oData.Pbtxt;
							perAltAlan = oData.Btext;
							isAlan = oData.Gtext;
							isAnahtar = oData.StellTxt;
							orgBirim = oData.OrgehTxt;
							clsGrup = oData.Psgtext;
							clsAltGrp = oData.Psktext;
							skala = oData.Trfgr;
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "Terfi";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
							that.getView().byId("posApprove").setValue(pozisyon);
							that.getView().byId("perAlanApprove").setValue(perAlan);
							that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
							that.getView().byId("isAlanApprove").setValue(isAlan);
							that.getView().byId("isAnahApprove").setValue(isAnahtar);
							that.getView().byId("orgBrmApprove").setValue(orgBirim);
							that.getView().byId("clsGrpApprove").setValue(clsGrup);
							that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
							that.getView().byId("skalaApprove").setValue(skala);
							that.getView().byId("ucretApprove").setValue(ucret);
							that.getView().byId("digerApprove").setValue(diger);
							that.getView().byId("okulTurApprove").setValue(okulTur);
							that.getView().byId("okulAdApprove").setValue(okulAd);
							that.getView().byId("egitimApprove").setValue(egitim);
							that.getView().byId("sirketApprove").setValue(sirket);
							that.getView().byId("dilPrimApprove").setValue(dilPrim);
							that.getView().byId("aracPrimApprove").setValue(aracPrim);
							that.getView().byId("mevPrimApprove").setValue(mevPrim);
							that.getView().byId("vekPrimApprove").setValue(vekPrim);
							that.getView().byId("tcApprove").setValue(tc);
							that.getView().byId("sicilApprove").setValue(sicil);

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("IconTabAttach").setVisible(false);
							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable").setVisible(true);
							that.getView().byId("formPD").setVisible(true);

						});

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				} else if (firstPronr === "04") {
					oModel.read("/ZHRTerfiSet('" + firstPernr + "')", null, null, true,
						function(oData) {
							pozisyon = oData.Stext;
							perAlan = oData.Pbtxt;
							perAltAlan = oData.Btext;
							isAlan = oData.Gtext;
							isAnahtar = oData.StellTxt;
							orgBirim = oData.OrgehTxt;
							clsGrup = oData.Psgtext;
							clsAltGrp = oData.Psktext;
							skala = oData.Trfgr;
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "Nakil";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
							that.getView().byId("posApprove").setValue(pozisyon);
							that.getView().byId("perAlanApprove").setValue(perAlan);
							that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
							that.getView().byId("isAlanApprove").setValue(isAlan);
							that.getView().byId("isAnahApprove").setValue(isAnahtar);
							that.getView().byId("orgBrmApprove").setValue(orgBirim);
							that.getView().byId("clsGrpApprove").setValue(clsGrup);
							that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
							that.getView().byId("skalaApprove").setValue(skala);
							that.getView().byId("ucretApprove").setValue(ucret);
							that.getView().byId("digerApprove").setValue(diger);
							that.getView().byId("okulTurApprove").setValue(okulTur);
							that.getView().byId("okulAdApprove").setValue(okulAd);
							that.getView().byId("egitimApprove").setValue(egitim);
							that.getView().byId("sirketApprove").setValue(sirket);
							that.getView().byId("dilPrimApprove").setValue(dilPrim);
							that.getView().byId("aracPrimApprove").setValue(aracPrim);
							that.getView().byId("mevPrimApprove").setValue(mevPrim);
							that.getView().byId("vekPrimApprove").setValue(vekPrim);
							that.getView().byId("tcApprove").setValue(tc);
							that.getView().byId("sicilApprove").setValue(sicil);

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("IconTabAttach").setVisible(false);
							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable").setVisible(true);
							that.getView().byId("formPD").setVisible(true);

						});

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				} else if (firstPronr === "05") {
					oModel.read("/ZHRTerfiSet('" + firstPernr + "')", null, null, true,
						function(oData) {
							pozisyon = oData.Stext;
							perAlan = oData.Pbtxt;
							perAltAlan = oData.Btext;
							isAlan = oData.Gtext;
							isAnahtar = oData.StellTxt;
							orgBirim = oData.OrgehTxt;
							clsGrup = oData.Psgtext;
							clsAltGrp = oData.Psktext;
							skala = oData.Trfgr;
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "Görev Değişikliği";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
							that.getView().byId("posApprove").setValue(pozisyon);
							that.getView().byId("perAlanApprove").setValue(perAlan);
							that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
							that.getView().byId("isAlanApprove").setValue(isAlan);
							that.getView().byId("isAnahApprove").setValue(isAnahtar);
							that.getView().byId("orgBrmApprove").setValue(orgBirim);
							that.getView().byId("clsGrpApprove").setValue(clsGrup);
							that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
							that.getView().byId("skalaApprove").setValue(skala);
							that.getView().byId("ucretApprove").setValue(ucret);
							that.getView().byId("digerApprove").setValue(diger);
							that.getView().byId("okulTurApprove").setValue(okulTur);
							that.getView().byId("okulAdApprove").setValue(okulAd);
							that.getView().byId("egitimApprove").setValue(egitim);
							that.getView().byId("sirketApprove").setValue(sirket);
							that.getView().byId("dilPrimApprove").setValue(dilPrim);
							that.getView().byId("aracPrimApprove").setValue(aracPrim);
							that.getView().byId("mevPrimApprove").setValue(mevPrim);
							that.getView().byId("vekPrimApprove").setValue(vekPrim);
							that.getView().byId("tcApprove").setValue(tc);
							that.getView().byId("sicilApprove").setValue(sicil);

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("IconTabAttach").setVisible(false);
							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable").setVisible(true);
							that.getView().byId("formPD").setVisible(true);

						});

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				} else if (firstPronr === "06") {
					oModel.read("/ZHRTerfiSet('" + firstPernr + "')", null, null, true,
						function(oData) {
							pozisyon = oData.Stext;
							perAlan = oData.Pbtxt;
							perAltAlan = oData.Btext;
							isAlan = oData.Gtext;
							isAnahtar = oData.StellTxt;
							orgBirim = oData.OrgehTxt;
							clsGrup = oData.Psgtext;
							clsAltGrp = oData.Psktext;
							skala = oData.Trfgr;
							ucret = oData.Ucret;
							diger = oData.Diger;
							okulTur = oData.SlartTxt;
							okulAd = oData.Insti;
							egitim = oData.Ftext;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = oData.Arcpr;
							dilPrim = oData.Dilpr;
							mevPrim = oData.Mvspr;
							vekPrim = oData.Vklpr;
							sirket = oData.Bukrs;
							tc = oData.Tckno;
							sicil = firstPernr;
							fisKonu = "Ücret Değişikliği";

							that.getView().byId("fisApprove").setText(fisKonu);
							that.getView().byId("adSoyadApprove").setText(adSoyad);
							that.getView().byId("dogumTarihApprove").setText(that.firstFormatDate(dogumTarih));
							that.getView().byId("gecerTarihApprove").setText(that.firstFormatDate(gecerTarih));
							that.getView().byId("posApprove").setValue(pozisyon);
							that.getView().byId("perAlanApprove").setValue(perAlan);
							that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
							that.getView().byId("isAlanApprove").setValue(isAlan);
							that.getView().byId("isAnahApprove").setValue(isAnahtar);
							that.getView().byId("orgBrmApprove").setValue(orgBirim);
							that.getView().byId("clsGrpApprove").setValue(clsGrup);
							that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
							that.getView().byId("skalaApprove").setValue(skala);
							that.getView().byId("ucretApprove").setValue(ucret);
							that.getView().byId("digerApprove").setValue(diger);
							that.getView().byId("okulTurApprove").setValue(okulTur);
							that.getView().byId("okulAdApprove").setValue(okulAd);
							that.getView().byId("egitimApprove").setValue(egitim);
							that.getView().byId("sirketApprove").setValue(sirket);
							that.getView().byId("dilPrimApprove").setValue(dilPrim);
							that.getView().byId("aracPrimApprove").setValue(aracPrim);
							that.getView().byId("mevPrimApprove").setValue(mevPrim);
							that.getView().byId("vekPrimApprove").setValue(vekPrim);
							that.getView().byId("tcApprove").setValue(tc);
							that.getView().byId("sicilApprove").setValue(sicil);

							//begin of ycoskun visible yapma
							that.getView().byId("labelSicil").setVisible(true);
							that.getView().byId("sicilApprove").setVisible(true);
							that.getView().byId("labelDil").setVisible(true);
							that.getView().byId("dilPrimApprove").setVisible(true);
							that.getView().byId("labelArac").setVisible(true);
							that.getView().byId("aracPrimApprove").setVisible(true);
							that.getView().byId("labelMev").setVisible(true);
							that.getView().byId("mevPrimApprove").setVisible(true);
							that.getView().byId("labelVek").setVisible(true);
							that.getView().byId("vekPrimApprove").setVisible(true);
							that.getView().byId("labelTC").setVisible(true);
							that.getView().byId("tcApprove").setVisible(true);
							that.getView().byId("labelSirket").setVisible(true);
							that.getView().byId("sirketApprove").setVisible(true);

							that.getView().byId("labelOkulTur").setVisible(true);
							that.getView().byId("okulTurApprove").setVisible(true);
							that.getView().byId("labelOkulAd").setVisible(true);
							that.getView().byId("okulAdApprove").setVisible(true);
							that.getView().byId("labelEgitim").setVisible(true);
							that.getView().byId("egitimApprove").setVisible(true);

							that.getView().byId("IconTabAttach").setVisible(false);
							that.getView().byId("iconTabTable").setVisible(true);
							that.getView().byId("idPDTable").setVisible(true);
							that.getView().byId("formPD").setVisible(true);

						});

					//işe alım personelinin onaycılarının getirilmesi

					oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
						function(oData) {
							onayciModel.setData(oData);
							//	console.log(oData);
						});
					that.getView().setModel(onayciModel, "onayciModel");

					//end of ycoskun
				}
			}, 1000);

		},
		onListItemPress: function(oEvent) {
			var oThat = this;
			var selectItem = oEvent.getSource().getId();
			//oThat.getView().byId("idDetail").setValue(selectItemTitle);
			var arrayId = selectItem.split("-");
			var selectId = arrayId[arrayId.length - 1];
			//var selectId = oEvent.getSource().sId.slice(-1);
			oThat.getView().byId("idNot").setValue("");

			var oJModel = new sap.ui.model.json.JSONModel();
			var filter = "Appnr eq '" + appnrFilter + "' ";

			oModel.read("/ZHRDurumFisiOnaySet", null, ["$filter=" + filter], false,
				function(oData) {
					oJModel.setData(oData);
					selectPernr = oData.results[selectId].Pernr;
					selectPronr = oData.results[selectId].Pronr;
					console.log(selectPernr);

				});

			//işe alım için tıklanan personelin information alanına bilgilerin set edilmesi		
			var pozisyon, perAlan, perAltAlan, isAlan, isAnahtar, orgBirim, clsGrup, aracPrim, dilPrim, mevPrim, vekPrim, fisKonu;
			var clsAltGrp, skala, ucret, diger, okulTur, okulAd, egitim, adSoyad, dogumTarih, gecerTarih, sirket, tc, sicil;
			var oJPerModel = new sap.ui.model.json.JSONModel();
			var oLangModel = new sap.ui.model.json.JSONModel();
			var perFilter = "Pernr eq '" + selectPernr + "'";
			var oAbModel = new sap.ui.model.json.JSONModel();
			var perAbFilter = "Pernr eq '" + selectPernr + "'";
			var attachModel = new sap.ui.model.json.JSONModel();
			var perAttachFilter = "IvPernr eq '" + selectPernr + "'";
			var langtable = oThat.getView().byId("idLanguageTable");
			var zbtable = oThat.getView().byId("idAbilityTable");
			var onayciModel = new sap.ui.model.json.JSONModel();

			var oYDModel = new sap.ui.model.json.JSONModel();
			var perFilterYD = "Pernr eq '" + selectPernr + "'";
			var ozbModel = new sap.ui.model.json.JSONModel();
			var perZbFilter = "Pernr eq '" + selectPernr + "'";

			var YDtable = oThat.getView().byId("idLanguageTable");
			var ozbtable = oThat.getView().byId("idAbilityTable");
			var oPDModel = new sap.ui.model.json.JSONModel();
			var perFilterPD = "Pernr eq '" + selectPernr + "'";
			var pdtable = oThat.getView().byId("idPDTable");
			var pdtable3 = oThat.getView().byId("idLanguageTable3");

			selectAppnr = "01";
			var filterOnayci = "Pernr eq '" + selectPernr + "' and  Pronr eq '" + selectPronr + "' and Appnr eq '" + selectAppnr + "'";
			var that = this;
			if (selectPronr === "01") {
				oModel.read("/ZHRTalepPersonelBilgiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						/*	pozisyon = oData.Plans;
							perAlan = oData.Werks;
							perAltAlan = oData.Btrtl;
							isAlan = oData.Gsber;
							isAnahtar = oData.Stell;
							orgBirim = oData.Orgeh;
							clsGrup = oData.Persg;
							clsAltGrp = oData.Persk;
							skala = oData.Trfgr;
							ucret = oData.Bet01;
							diger = oData.Diger;
							okulTur = oData.Slart;
							okulAd = oData.Insti;
							egitim = oData.Fach1;
							adSoyad = oData.Ename;
							dogumTarih = oData.Gbdat;
							gecerTarih = oData.Begda;
							aracPrim = "";
							dilPrim = "";
							mevPrim = "";
							vekPrim = "";
							sirket = "";
							tc = "";
							sicil = "";
							fisKonu = "İşe Alım";*/
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = firstPernr;

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
						that.getView().byId("posApprove").setValue(pozisyon);
						that.getView().byId("perAlanApprove").setValue(perAlan);
						that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
						that.getView().byId("isAlanApprove").setValue(isAlan);
						that.getView().byId("isAnahApprove").setValue(isAnahtar);
						that.getView().byId("orgBrmApprove").setValue(orgBirim);
						that.getView().byId("clsGrpApprove").setValue(clsGrup);
						that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
						that.getView().byId("skalaApprove").setValue(skala);
						that.getView().byId("ucretApprove").setValue(ucret);
						that.getView().byId("digerApprove").setValue(diger);
						that.getView().byId("okulTurApprove").setValue(okulTur);
						that.getView().byId("okulAdApprove").setValue(okulAd);
						that.getView().byId("egitimApprove").setValue(egitim);
						that.getView().byId("sirketApprove").setValue(sirket);
						that.getView().byId("dilPrimApprove").setValue(dilPrim);
						that.getView().byId("aracPrimApprove").setValue(aracPrim);
						that.getView().byId("mevPrimApprove").setValue(mevPrim);
						that.getView().byId("vekPrimApprove").setValue(vekPrim);
						that.getView().byId("tcApprove").setValue(tc);
						that.getView().byId("sicilApprove").setValue(sicil);

						//begin of ycoskun visible false olacaklar 
						that.getView().byId("labelSicil").setVisible(false);
						that.getView().byId("sicilApprove").setVisible(false);
						that.getView().byId("labelDil").setVisible(false);
						that.getView().byId("dilPrimApprove").setVisible(false);
						that.getView().byId("labelArac").setVisible(false);
						that.getView().byId("aracPrimApprove").setVisible(false);
						that.getView().byId("labelMev").setVisible(false);
						that.getView().byId("mevPrimApprove").setVisible(false);
						that.getView().byId("labelVek").setVisible(false);
						that.getView().byId("vekPrimApprove").setVisible(false);
						that.getView().byId("labelTC").setVisible(false);
						that.getView().byId("tcApprove").setVisible(false);
						that.getView().byId("labelSirket").setVisible(false);
						that.getView().byId("sirketApprove").setVisible(false);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("IconTabAttach").setVisible(true);
						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable").setVisible(false);
						that.getView().byId("formPD").setVisible(false);

						//end of ycoskun

					});

				//işe alım personelinin yabancı dillerini getirme

				oModel.read("/ZHRIseAlimYDSet", null, ["$filter=" + perFilter], false,
					function(oData) {
						oLangModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(oLangModel, "LangModel");
				langtable.setModel(this.getView().getModel("LangModel"));

				//işe alım personelinin zihinsel beceri bilgilerini getirme

				oModel.read("/ZHRIseAlimZBSet", null, ["$filter=" + perAbFilter], false,
					function(oData) {
						oAbModel.setData(oData);

					});
				oThat.getView().setModel(oAbModel, "oAbModel");
				zbtable.setModel(this.getView().getModel("oAbModel"));

				//işe alım personelinin eklerinin getirilmesi

				oModel.read("/ZHRAttachDisplaySet", null, ["$filter=" + perAttachFilter], false,
					function(oData) {
						attachModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(attachModel, "attachModel");

				//end of ycoskun

				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun

			} else if (selectPronr === "02") {
				oModel.read("/ZHRIstenCikisSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = firstPernr;

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
						that.getView().byId("posApprove").setValue(pozisyon);
						that.getView().byId("perAlanApprove").setValue(perAlan);
						that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
						that.getView().byId("isAlanApprove").setValue(isAlan);
						that.getView().byId("isAnahApprove").setValue(isAnahtar);
						that.getView().byId("orgBrmApprove").setValue(orgBirim);
						that.getView().byId("clsGrpApprove").setValue(clsGrup);
						that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
						that.getView().byId("skalaApprove").setValue(skala);
						that.getView().byId("ucretApprove").setValue(ucret);
						that.getView().byId("digerApprove").setValue(diger);
						that.getView().byId("okulTurApprove").setValue(okulTur);
						that.getView().byId("okulAdApprove").setValue(okulAd);
						that.getView().byId("egitimApprove").setValue(egitim);
						that.getView().byId("sirketApprove").setValue(sirket);
						that.getView().byId("dilPrimApprove").setValue(dilPrim);
						that.getView().byId("aracPrimApprove").setValue(aracPrim);
						that.getView().byId("mevPrimApprove").setValue(mevPrim);
						that.getView().byId("vekPrimApprove").setValue(vekPrim);
						that.getView().byId("tcApprove").setValue(tc);
						that.getView().byId("sicilApprove").setValue(sicil);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);

						that.getView().byId("labelOkulTur").setVisible(false);
						that.getView().byId("okulTurApprove").setVisible(false);
						that.getView().byId("labelOkulAd").setVisible(false);
						that.getView().byId("okulAdApprove").setVisible(false);
						that.getView().byId("labelEgitim").setVisible(false);
						that.getView().byId("egitimApprove").setVisible(false);

						that.getView().byId("IconTabAttach").setVisible(false);
						that.getView().byId("iconTabTable").setVisible(false);
						that.getView().byId("idPDTable").setVisible(false);
						that.getView().byId("formPD").setVisible(false);
						//end of ycoskun

					});
				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun

				//end of ycoskun
			} else if (selectPronr === "03") {
				oModel.read("/ZHRTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Terfi";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
						that.getView().byId("posApprove").setValue(pozisyon);
						that.getView().byId("perAlanApprove").setValue(perAlan);
						that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
						that.getView().byId("isAlanApprove").setValue(isAlan);
						that.getView().byId("isAnahApprove").setValue(isAnahtar);
						that.getView().byId("orgBrmApprove").setValue(orgBirim);
						that.getView().byId("clsGrpApprove").setValue(clsGrup);
						that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
						that.getView().byId("skalaApprove").setValue(skala);
						that.getView().byId("ucretApprove").setValue(ucret);
						that.getView().byId("digerApprove").setValue(diger);
						that.getView().byId("okulTurApprove").setValue(okulTur);
						that.getView().byId("okulAdApprove").setValue(okulAd);
						that.getView().byId("egitimApprove").setValue(egitim);
						that.getView().byId("sirketApprove").setValue(sirket);
						that.getView().byId("dilPrimApprove").setValue(dilPrim);
						that.getView().byId("aracPrimApprove").setValue(aracPrim);
						that.getView().byId("mevPrimApprove").setValue(mevPrim);
						that.getView().byId("vekPrimApprove").setValue(vekPrim);
						that.getView().byId("tcApprove").setValue(tc);
						that.getView().byId("sicilApprove").setValue(sicil);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("IconTabAttach").setVisible(false);
						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable").setVisible(true);
						that.getView().byId("formPD").setVisible(true);

						//end of ycoskun

					});
				//begin of ycoskun terfi yabancı dilleri getir

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						oYDModel.setData(oData);

					});
				oThat.getView().setModel(oYDModel, "oYDModel");
				YDtable.setModel(this.getView().getModel("oYDModel"));

				//end of ycoskun

				//begin of ycoskun  zihinsel beceri bilgileri getir

				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
					function(oData) {
						ozbModel.setData(oData);

					});
				oThat.getView().setModel(ozbModel, "ozbModel");
				ozbtable.setModel(this.getView().getModel("ozbModel"));

				//end of ycoskun

				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				oThat.getView().setModel(oPDModel, "PDModel");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun

				//begin of ycoskun terfi yabancı dilleri getir
				var olangModel = new sap.ui.model.json.JSONModel();
				selectPernr = that.getView().byId("sicilApprove").getValue();

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						olangModel.setData(oData);

					});
				oThat.getView().setModel(olangModel, "LangModel");
				pdtable3.setModel(this.getView().getModel("LangModel"));

				//end of ycoskun
			} else if (selectPronr === "04") {
				oModel.read("/ZHRTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Nakil";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
						that.getView().byId("posApprove").setValue(pozisyon);
						that.getView().byId("perAlanApprove").setValue(perAlan);
						that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
						that.getView().byId("isAlanApprove").setValue(isAlan);
						that.getView().byId("isAnahApprove").setValue(isAnahtar);
						that.getView().byId("orgBrmApprove").setValue(orgBirim);
						that.getView().byId("clsGrpApprove").setValue(clsGrup);
						that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
						that.getView().byId("skalaApprove").setValue(skala);
						that.getView().byId("ucretApprove").setValue(ucret);
						that.getView().byId("digerApprove").setValue(diger);
						that.getView().byId("okulTurApprove").setValue(okulTur);
						that.getView().byId("okulAdApprove").setValue(okulAd);
						that.getView().byId("egitimApprove").setValue(egitim);
						that.getView().byId("sirketApprove").setValue(sirket);
						that.getView().byId("dilPrimApprove").setValue(dilPrim);
						that.getView().byId("aracPrimApprove").setValue(aracPrim);
						that.getView().byId("mevPrimApprove").setValue(mevPrim);
						that.getView().byId("vekPrimApprove").setValue(vekPrim);
						that.getView().byId("tcApprove").setValue(tc);
						that.getView().byId("sicilApprove").setValue(sicil);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("IconTabAttach").setVisible(false);
						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable").setVisible(true);
						that.getView().byId("formPD").setVisible(true);

						//end of ycoskun

					});
				//begin of ycoskun terfi yabancı dilleri getir

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						oYDModel.setData(oData);

					});
				oThat.getView().setModel(oYDModel, "oYDModel");
				YDtable.setModel(this.getView().getModel("oYDModel"));

				//end of ycoskun

				//begin of ycoskun  zihinsel beceri bilgileri getir

				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
					function(oData) {
						ozbModel.setData(oData);

					});
				oThat.getView().setModel(ozbModel, "ozbModel");
				ozbtable.setModel(this.getView().getModel("ozbModel"));

				//end of ycoskun
				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				oThat.getView().setModel(oPDModel, "PDModel");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun

				//begin of ycoskun terfi yabancı dilleri getir
				selectPernr = that.getView().byId("sicilApprove").getValue();

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						olangModel.setData(oData);

					});
				oThat.getView().setModel(olangModel, "LangModel");
				pdtable3.setModel(this.getView().getModel("LangModel"));

				//end of ycoskun
			} else if (selectPronr === "05") {
				oModel.read("/ZHRTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Görev Değişikliği";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
						that.getView().byId("posApprove").setValue(pozisyon);
						that.getView().byId("perAlanApprove").setValue(perAlan);
						that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
						that.getView().byId("isAlanApprove").setValue(isAlan);
						that.getView().byId("isAnahApprove").setValue(isAnahtar);
						that.getView().byId("orgBrmApprove").setValue(orgBirim);
						that.getView().byId("clsGrpApprove").setValue(clsGrup);
						that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
						that.getView().byId("skalaApprove").setValue(skala);
						that.getView().byId("ucretApprove").setValue(ucret);
						that.getView().byId("digerApprove").setValue(diger);
						that.getView().byId("okulTurApprove").setValue(okulTur);
						that.getView().byId("okulAdApprove").setValue(okulAd);
						that.getView().byId("egitimApprove").setValue(egitim);
						that.getView().byId("sirketApprove").setValue(sirket);
						that.getView().byId("dilPrimApprove").setValue(dilPrim);
						that.getView().byId("aracPrimApprove").setValue(aracPrim);
						that.getView().byId("mevPrimApprove").setValue(mevPrim);
						that.getView().byId("vekPrimApprove").setValue(vekPrim);
						that.getView().byId("tcApprove").setValue(tc);
						that.getView().byId("sicilApprove").setValue(sicil);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("IconTabAttach").setVisible(false);
						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable").setVisible(true);
						that.getView().byId("formPD").setVisible(true);

						//end of ycoskun

					});
				//begin of ycoskun terfi yabancı dilleri getir

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						oYDModel.setData(oData);

					});
				oThat.getView().setModel(oYDModel, "oYDModel");
				YDtable.setModel(this.getView().getModel("oYDModel"));

				//end of ycoskun

				//begin of ycoskun  zihinsel beceri bilgileri getir

				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
					function(oData) {
						ozbModel.setData(oData);

					});
				oThat.getView().setModel(ozbModel, "ozbModel");
				ozbtable.setModel(this.getView().getModel("ozbModel"));

				//end of ycoskun

				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				oThat.getView().setModel(oPDModel, "PDModel");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun

				//begin of ycoskun terfi yabancı dilleri getir
				selectPernr = that.getView().byId("sicilApprove").getValue();

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						olangModel.setData(oData);

					});
				oThat.getView().setModel(olangModel, "LangModel");
				pdtable3.setModel(this.getView().getModel("LangModel"));

				//end of ycoskun
			} else if (selectPronr === "06") {
				oModel.read("/ZHRTerfiSet('" + selectPernr + "')", null, null, true,
					function(oData) {
						oJPerModel.setData(oData);
						pozisyon = oData.Stext;
						perAlan = oData.Pbtxt;
						perAltAlan = oData.Btext;
						isAlan = oData.Gtext;
						isAnahtar = oData.StellTxt;
						orgBirim = oData.OrgehTxt;
						clsGrup = oData.Psgtext;
						clsAltGrp = oData.Psktext;
						skala = oData.Trfgr;
						ucret = oData.Ucret;
						diger = oData.Diger;
						okulTur = oData.SlartTxt;
						okulAd = oData.Insti;
						egitim = oData.Ftext;
						adSoyad = oData.Ename;
						dogumTarih = oData.Gbdat;
						gecerTarih = oData.Begda;
						aracPrim = oData.Arcpr;
						dilPrim = oData.Dilpr;
						mevPrim = oData.Mvspr;
						vekPrim = oData.Vklpr;
						sirket = oData.Bukrs;
						tc = oData.Tckno;
						sicil = selectPernr;
						fisKonu = "Ücret Değişikliği";

						that.getView().byId("fisApprove").setText(fisKonu);
						that.getView().byId("adSoyadApprove").setText(adSoyad);
						that.getView().byId("dogumTarihApprove").setText(that.formatDate(dogumTarih));
						that.getView().byId("gecerTarihApprove").setText(that.formatDate(gecerTarih));
						that.getView().byId("posApprove").setValue(pozisyon);
						that.getView().byId("perAlanApprove").setValue(perAlan);
						that.getView().byId("perAltAlanApprove").setValue(perAltAlan);
						that.getView().byId("isAlanApprove").setValue(isAlan);
						that.getView().byId("isAnahApprove").setValue(isAnahtar);
						that.getView().byId("orgBrmApprove").setValue(orgBirim);
						that.getView().byId("clsGrpApprove").setValue(clsGrup);
						that.getView().byId("clsAltGrpApprove").setValue(clsAltGrp);
						that.getView().byId("skalaApprove").setValue(skala);
						that.getView().byId("ucretApprove").setValue(ucret);
						that.getView().byId("digerApprove").setValue(diger);
						that.getView().byId("okulTurApprove").setValue(okulTur);
						that.getView().byId("okulAdApprove").setValue(okulAd);
						that.getView().byId("egitimApprove").setValue(egitim);
						that.getView().byId("sirketApprove").setValue(sirket);
						that.getView().byId("dilPrimApprove").setValue(dilPrim);
						that.getView().byId("aracPrimApprove").setValue(aracPrim);
						that.getView().byId("mevPrimApprove").setValue(mevPrim);
						that.getView().byId("vekPrimApprove").setValue(vekPrim);
						that.getView().byId("tcApprove").setValue(tc);
						that.getView().byId("sicilApprove").setValue(sicil);

						//begin of ycoskun visible yapma
						that.getView().byId("labelSicil").setVisible(true);
						that.getView().byId("sicilApprove").setVisible(true);
						that.getView().byId("labelDil").setVisible(true);
						that.getView().byId("dilPrimApprove").setVisible(true);
						that.getView().byId("labelArac").setVisible(true);
						that.getView().byId("aracPrimApprove").setVisible(true);
						that.getView().byId("labelMev").setVisible(true);
						that.getView().byId("mevPrimApprove").setVisible(true);
						that.getView().byId("labelVek").setVisible(true);
						that.getView().byId("vekPrimApprove").setVisible(true);
						that.getView().byId("labelTC").setVisible(true);
						that.getView().byId("tcApprove").setVisible(true);
						that.getView().byId("labelSirket").setVisible(true);
						that.getView().byId("sirketApprove").setVisible(true);

						that.getView().byId("labelOkulTur").setVisible(true);
						that.getView().byId("okulTurApprove").setVisible(true);
						that.getView().byId("labelOkulAd").setVisible(true);
						that.getView().byId("okulAdApprove").setVisible(true);
						that.getView().byId("labelEgitim").setVisible(true);
						that.getView().byId("egitimApprove").setVisible(true);

						that.getView().byId("IconTabAttach").setVisible(false);
						that.getView().byId("iconTabTable").setVisible(true);
						that.getView().byId("idPDTable").setVisible(true);
						that.getView().byId("formPD").setVisible(true);

						//end of ycoskun

					});
				//begin of ycoskun terfi yabancı dilleri getir

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						oYDModel.setData(oData);

					});
				oThat.getView().setModel(oYDModel, "oYDModel");
				YDtable.setModel(this.getView().getModel("oYDModel"));

				//end of ycoskun

				//begin of ycoskun  zihinsel beceri bilgileri getir

				oModel.read("/ZHRTerfiZBSet", null, ["$filter=" + perZbFilter], true,
					function(oData) {
						ozbModel.setData(oData);

					});
				oThat.getView().setModel(ozbModel, "ozbModel");
				ozbtable.setModel(this.getView().getModel("ozbModel"));

				//end of ycoskun

				oModel.read("/ZHRTerfiPDSet", null, ["$filter=" + perFilterPD], true,
					function(oData) {
						oPDModel.setData(oData);

					});
				oThat.getView().setModel(oPDModel, "PDModel");
				pdtable.setModel(this.getView().getModel("PDModel"));
				//işe alım personelinin onaycılarının getirilmesi

				oModel.read("/ZHROnayciStatuSet", null, ["$filter=" + filterOnayci], false,
					function(oData) {
						onayciModel.setData(oData);
						//	console.log(oData);
					});
				oThat.getView().setModel(onayciModel, "onayciModel");

				//end of ycoskun

				//begin of ycoskun terfi yabancı dilleri getir
				selectPernr = that.getView().byId("sicilApprove").getValue();

				oModel.read("/ZHRTerfiYDSet", null, ["$filter=" + perFilterYD], true,
					function(oData) {
						olangModel.setData(oData);

					});
				oThat.getView().setModel(olangModel, "LangModel");
				pdtable3.setModel(this.getView().getModel("LangModel"));

				//end of ycoskun
			}

		},
		onApprovePress: function() {
			var oThat = this;
			var pernr = selectPernr;
			var pronrFilter = selectPronr;
			var not = oThat.getView().byId("idNot").getValue();
			var oEntry = {};

			oEntry.Decision = "A";
			oEntry.Dectext = not;
			oEntry.Pronr = pronrFilter;
			oEntry.Appnr = appnrFilter;
			oEntry.Doc = pernr;

			MessageBox["warning"]("Formu Onaylamak istediğinize emin misiniz?", {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {

						oModel.create("/ZHRDurumAppRejSet", oEntry, {
							method: "POST",
							success: function() {
								console.log("SUCCESS");
								sap.m.MessageToast.show("Form Onaylandı.");
								oModel.refresh(true);
								oThat.onInit();

							},
							error: function() {
								console.log("ERROR");
							}
						});
					}
				}
			});

		},
		onRejectPress: function() {
			var oThat = this;
			var pernr = selectPernr;
			var pronrFilter = selectPronr;
			not = oThat.getView().byId("idNot").getValue();
			var oEntry = {};

			oEntry.Decision = "R";
			oEntry.Dectext = not;
			oEntry.Pronr = pronrFilter;
			oEntry.Appnr = appnrFilter;
			oEntry.Doc = pernr;

			MessageBox["warning"]("Reddetme işlemi geri alınamamaktadır. Devam etmek istiyor musunuz?", {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {

						oModel.create("/ZHRDurumAppRejSet", oEntry, {
							method: "POST",
							success: function() {
								console.log("SUCCESS");
								sap.m.MessageToast.show("Form Reddedildi.");
								oModel.refresh(true);
								oThat.onInit();

							},
							error: function() {
								console.log("ERROR");
							}
						});
						oModel.refresh(true);
						oThat.onInit();
					}
				}
			});

		},
		onToNext: function() {

		},
		_handleMessageBoxOpen: function(sMessage, sMessageBoxType) {
			var that = this;
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.YES) {
						window.location.replace("/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html");

					}
				}
			});

		},
		onCancel: function() {
			this._handleMessageBoxOpen("Çıkmak istediğine emin misin?", "warning");
		},
		statusIcon: function(sStatu) {
			if (sStatu === "A") {
				return "sap-icon://accept";
			} else if (sStatu === "R") {
				return "sap-icon://decline";
			} else {
				return "sap-icon://pending";
			}
		},
		status: function(sStatu) {
			if (sStatu === "A") {
				return "Success";
			} else if (sStatu === "R") {
				return "Warning";
			} else {
				return "None";
			}

		},
		vDate: function(value) {
			if (value) {
				var yil = value.substring(0, 4);
				var ay = value.substring(4, 6);
				var gun = value.substring(6, 8);
				var tarih = gun + "." + ay + "." + yil;
				return tarih;
			} else {
				return value;
			}
		}

	});

}, /* bExport= */ true);