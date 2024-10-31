(function($) {
    "use strict";
    function box_shadow_utility(selector, attribute, group, subgroup, refresh) {
        azh.controls_options = azh.controls_options.concat([
            {
                "refresh": refresh,
                "type": "exists-attribute",
                "selector": selector,
                "menu": "utility",
                "group": group,
                "subgroup": subgroup,
                "attribute": attribute,
                "value": "0px 0px 0px 0px rgba(0,0,0,1)",
                "control_class": "azh-toggle azh-box-shadow",
                "control_type": "box-shadow",
                "control_text": "Box shadow"
            },
            {
                "refresh": refresh,
                "type": "color-attribute",
                "menu": "utility",
                "group": group,
                "selector": selector,
                "subgroup": subgroup,
                "attribute": attribute,
                "alpha": true,
                "pattern": /(-?\d+px -?\d+px \d+px -?\d+px )(rgba\(\d+,\d+,\d+,\d.?\d*\))()/,
                "default": "0px 0px 0px 0px rgba(0,0,0,1)",
                "control_class": "azh-box-shadow-color",
                "control_type": "box-shadow-color",
                "control_text": "Color"
            },
            {
                "refresh": refresh,
                "type": "integer-attribute",
                "selector": selector,
                "menu": "utility",
                "group": group,
                "subgroup": subgroup,
                "attribute": attribute,
                "pattern": /(-?\d+px -?\d+px )(\d+)(px -?\d+px rgba\(\d+,\d+,\d+,\d.?\d*\))/,
                "default": "0px 0px 0px 0px rgba(0,0,0,1)",
                "min": 0,
                "max": 100,
                "step": 1,
                "control_class": "azh-box-shadow-blur",
                "control_type": "box-shadow-blur",
                "control_text": "Blur"
            },
            {
                "refresh": refresh,
                "type": "integer-attribute",
                "selector": selector,
                "menu": "utility",
                "group": group,
                "subgroup": subgroup,
                "attribute": attribute,
                "pattern": /(-?\d+px -?\d+px \d+px )(-?\d+)(px rgba\(\d+,\d+,\d+,\d.?\d*\))/,
                "default": "0px 0px 0px 0px rgba(0,0,0,1)",
                "min": -100,
                "max": 100,
                "step": 1,
                "control_class": "azh-box-shadow-spread",
                "control_type": "box-shadow-spread",
                "control_text": "Spread"
            },
            {
                "refresh": refresh,
                "type": "integer-attribute",
                "selector": selector,
                "menu": "utility",
                "group": group,
                "subgroup": subgroup,
                "attribute": attribute,
                "pattern": /()(-?\d+)(px -?\d+px \d+px -?\d+px rgba\(\d+,\d+,\d+,\d.?\d*\))/,
                "default": "0px 0px 0px 0px rgba(0,0,0,1)",
                "min": -100,
                "max": 100,
                "step": 1,
                "control_class": "azh-box-shadow-horizontal",
                "control_type": "box-shadow-horizontal",
                "control_text": "Horizontal"
            },
            {
                "refresh": refresh,
                "type": "integer-attribute",
                "selector": selector,
                "menu": "utility",
                "group": group,
                "subgroup": subgroup,
                "attribute": attribute,
                "pattern": /(-?\d+px )(-?\d+)(px \d+px -?\d+px rgba\(\d+,\d+,\d+,\d.?\d*\))/,
                "default": "0px 0px 0px 0px rgba(0,0,0,1)",
                "min": -100,
                "max": 100,
                "step": 1,
                "control_class": "azh-box-shadow-vertical",
                "control_type": "box-shadow-vertical",
                "control_text": "Vertical"
            }
        ]);
    }

    var animation_types = {
        "fadeIn": "fadeIn",
        "zoomIn": "zoomIn",
        "zoomOut": "zoomOut",
        "fadeInUp": "fadeInUp",
        "fadeInDown": "fadeInDown",
        "fadeInRight": "fadeInRight",
        "fadeInLeft": "fadeInLeft",
        "rotateIn": "rotateIn",
        "rotateOut": "rotateOut",
        "flipInX": "flipInX",
        "flipInY": "flipInY",
        "swingTop": "swingTop",
        "swingBottom": "swingBottom",
        "swingRight": "swingRight",
        "swingLeft": "swingLeft",
        "flash": "flash",
        "pulse": "pulse",
        "rubberBand": "rubberBand",
        "shake": "shake",
        "swing": "swing",
        "tada": "tada",
        "wobble": "wobble",
        "bounce": "bounce",
        "bounceIn": "bounceIn",
        "bounceInUp": "bounceInUp",
        "bounceInDown": "bounceInDown",
        "bounceInRight": "bounceInRight",
        "bounceInLeft": "bounceInLeft",
        "unFold": "unFold",
        "flowIn": "flowIn",
    };
    window.azh = $.extend({}, window.azh);
    if (!('controls_options' in azh)) {
        azh.controls_options = [];
    }
    azh.controls_options = azh.controls_options.concat([
        {
            "type": "radio-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup type",
            "options": {
                "none": "None",
                "delayed": "Delayed",
                "exit": "Exit",
                "scrolled": "Scrolled",
            },
            "attribute": "data-popuptype",
            "control_class": "azh-popupType azh-default",
            "control_type": "popupType",
            "control_text": "Popup type"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup type",
            "attribute": "data-delaytime",
            "min": "0",
            "max": "180",
            "step": "5",
            "control_class": "azh-delayTime",
            "control_type": "delayTime",
            "control_text": "Delay time (s)"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup type",
            "attribute": "data-scrolltopdistance",
            "min": "100",
            "max": "5000",
            "step": "100",
            "control_class": "azh-scrollTopDistance",
            "control_type": "scrollTopDistance",
            "control_text": "Scroll distance (px)"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup type",
            "attribute": "data-autoclose",
            "control_class": "azh-toggle azh-autoClose",
            "control_type": "autoClose",
            "control_text": "Auto close"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup type",
            "attribute": "data-autoclosedelay",
            "min": "1",
            "max": "60",
            "step": "1",
            "control_class": "azh-autoCloseDelay",
            "control_type": "autoCloseDelay",
            "control_text": "Auto close delay (s)"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup cookies",
            "attribute": "data-setcookie",
            "control_class": "azh-toggle azh-setCookie",
            "control_type": "setCookie",
            "control_text": "Set cookie"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup cookies",
            "attribute": "data-cookiedays",
            "min": "0",
            "max": "365",
            "step": "1",
            "control_class": "azh-cookieDays",
            "control_type": "cookieDays",
            "control_text": "Cookie lifetime (days)"
        },
        {
            "type": "input-attribute",
            "input_type": "text",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup cookies",
            "attribute": "data-cookietriggerclass",
            "control_class": "azh-cookieTriggerClass",
            "control_type": "cookieTriggerClass",
            "control_text": "Cookie trigger class"
        },
        {
            "type": "input-attribute",
            "input_type": "text",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup cookies",
            "attribute": "data-cookiename",
            "control_class": "azh-cookieName",
            "control_type": "cookieName",
            "control_text": "Cookie name"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup cookies",
            "options": {
                "domain": "Domain",
                "page": "Current page",
            },
            "attribute": "data-cookiescope",
            "control_class": "azh-cookieScope azh-default",
            "control_type": "cookieScope",
            "control_text": "Cookie scope"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Overlay styling",
            "attribute": "data-overlayvisible",
            "control_class": "azh-toggle azh-overlayVisible",
            "control_type": "overlayVisible",
            "control_text": "Overlay visible"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Overlay styling",
            "attribute": "data-overlayClosesPopup",
            "control_class": "azh-toggle azh-overlayClosesPopup",
            "control_type": "overlayClosesPopup",
            "control_text": "Overlay closes popup"
        },
        {
            "type": "color-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "alpha": true,
            "group": "Overlay styling",
            "attribute": "data-overlaycolor",
            "control_class": "azh-overlayColor",
            "control_type": "overlayColor",
            "control_text": "Background color"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Overlay styling",
            "attribute": "data-overlayanimationduration",
            "min": "0.1",
            "max": "2",
            "step": "0.1",
            "control_class": "azh-overlayAnimationDuration",
            "control_type": "overlayAnimationDuration",
            "control_text": "Animation duration (s)"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Overlay styling",
            "options": animation_types,
            "attribute": "data-overlayanimationeffect",
            "control_class": "azh-overlayAnimationEffect azh-default",
            "control_type": "overlayAnimationEffect",
            "control_text": "Animation effect"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Background effects",
            "options": {
                "none": "None",
                "scale": "Scale",
                "blur": "Blur",
                "moveUp": "Move up",
                "moveDown": "Move down",
                "moveLeft": "Move left",
                "moveRight": "Move right",
            },
            "attribute": "data-pageanimationeffect",
            "control_class": "azh-pageAnimationEffect azh-default",
            "control_type": "pageAnimationEffect",
            "control_text": "Animation effect"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Background effects",
            "attribute": "data-pageanimationduration",
            "min": "0.1",
            "max": "2",
            "step": "0.1",
            "control_class": "azh-pageAnimationDuration",
            "control_type": "pageAnimationDuration",
            "control_text": "Animation duration (s)"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Background effects",
            "attribute": "data-pagescalevalue",
            "min": "0.1",
            "max": "2",
            "step": "0.1",
            "control_class": "azh-pageScaleValue",
            "control_type": "pageScaleValue",
            "control_text": "Scale value"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Background effects",
            "attribute": "data-pageblurradius",
            "slider": true,
            "units": {
                "px": {
                    "min": "1",
                    "max": "20",
                    "step": "1",                    
                },
                "%": {
                    "min": "0",
                    "max": "100",
                    "step": "1",                                        
                }
            },
            "control_class": "azh-pageBlurRadius",
            "control_type": "pageBlurRadius",
            "control_text": "Blur radius"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Background effects",
            "attribute": "data-pagemovedistance",
            "min": "0",
            "max": "100",
            "step": "1",
            "units": "%",
            "control_class": "azh-pageMoveDistance",
            "control_type": "pageMoveDistance",
            "control_text": "Move distance"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "attribute": "data-popupwidth",
            "slider": true,
            "units": {
                "px": {
                    "min": "100",
                    "max": "800",
                    "step": "10",
                },
                "%": {
                    "min": "0",
                    "max": "100",
                    "step": "1",                                        
                }
            },            
            "control_class": "azh-popupWidth",
            "control_type": "popupWidth",
            "control_text": "Popup width"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "attribute": "data-popupheight",
            "slider": true,
            "units": {
                "px": {
                    "min": "50",
                    "max": "600",
                    "step": "10",
                },
                "%": {
                    "min": "0",
                    "max": "100",
                    "step": "1",                                        
                }
            },            
            "control_class": "azh-popupHeight",
            "control_type": "popupHeight",
            "control_text": "Popup height"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "options": {
                "bottomRight": "Bottom right",
                "bottomCenter": "Bottom center",
                "bottomLeft": "Bottom left",
                "left": "Left",
                "center": "Center",
                "right": "Right",
                "topRight": "Top right",
                "topCenter": "Top center",
                "topLeft": "Top left",
            },
            "attribute": "data-popuplocation",
            "control_class": "azh-popupLocation azh-default",
            "control_type": "popupLocation",
            "control_text": "Popup location"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "attribute": "data-popupanimationduration",
            "min": "0.1",
            "max": "2",
            "step": "0.1",
            "control_class": "azh-popupAnimationDuration",
            "control_type": "popupAnimationDuration",
            "control_text": "Animation duration (s)"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "options": animation_types,
            "attribute": "data-popupanimationeffect",
            "control_class": "azh-popupAnimationEffect azh-default",
            "control_type": "popupAnimationEffect",
            "control_text": "Animation effect"
        },
        {
            "type": "color-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "alpha": true,
            "group": "Popup styling",
            "attribute": "data-popupbackground",
            "control_class": "azh-popupBackground",
            "control_type": "popupBackground",
            "control_text": "Background color"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "attribute": "data-popupradius",
            "slider": true,
            "units": {
                "px": {
                    "min": "0",
                    "max": "60",
                    "step": "1",
                },
                "%": {
                    "min": "0",
                    "max": "100",
                    "step": "1",                                        
                }
            },            
            "control_class": "azh-popupRadius",
            "control_type": "popupRadius",
            "control_text": "Popup radius"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "attribute": "data-popupmargin",
            "min": "0",
            "max": "100",
            "step": "1",
            "units": "px",
            "control_class": "azh-popupMargin",
            "control_type": "popupMargin",
            "control_text": "Popup margin"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Popup styling",
            "attribute": "data-popuppadding",
            "min": "0",
            "max": "100",
            "step": "1",
            "units": "px",
            "control_class": "azh-popupPadding",
            "control_type": "popupPadding",
            "control_text": "Popup padding"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Animate content",
            "attribute": "data-contentanimation",
            "control_class": "azh-toggle azh-contentAnimation",
            "control_type": "contentAnimation",
            "control_text": "Content animation"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Animate content",
            "options": animation_types,
            "attribute": "data-contentanimationeffect",
            "control_class": "azh-contentAnimationEffect azh-default",
            "control_type": "contentAnimationEffect",
            "control_text": "Animation effect"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Animate content",
            "attribute": "data-contentanimationduration",
            "min": "0.1",
            "max": "2",
            "step": "0.1",
            "control_class": "azh-contentAnimationDuration",
            "control_type": "contentAnimationDuration",
            "control_text": "Animation duration (s)"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Animate content",
            "attribute": "data-contentanimationdelay",
            "min": "0.1",
            "max": "2",
            "step": "0.1",
            "control_class": "azh-contentAnimationDelay",
            "control_type": "contentAnimationDelay",
            "control_text": "Animation delay (s)"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Close and reopen button",
            "attribute": "data-addclosebutton",
            "control_class": "azh-toggle azh-addCloseButton",
            "control_type": "addCloseButton",
            "control_text": "Enable close button"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Close and reopen button",
            "options": {
                "icon": "Icon",
                "text": "Text",
                "labeled": "Labeled",
                "tag": "Tag",
                "circle": "Circle",
            },
            "attribute": "data-buttonstyle",
            "control_class": "azh-buttonStyle azh-default",
            "control_type": "buttonStyle",
            "control_text": "Button style"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Close and reopen button",
            "attribute": "data-enableesc",
            "control_class": "azh-toggle azh-enableESC",
            "control_type": "enableESC",
            "control_text": "Enable ESC key"
        },
        {
            "type": "input-attribute",
            "input_type": "text",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Close and reopen button",
            "attribute": "data-reopenclass",
            "control_class": "azh-reopenClass",
            "control_type": "reopenClass",
            "control_text": "Reopen class/selector"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-showonmobile",
            "control_class": "azh-toggle azh-showOnMobile",
            "control_type": "showOnMobile",
            "control_text": "Show on mobile"
        },
        {
            "type": "toggle-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-responsive",
            "control_class": "azh-toggle azh-responsive",
            "control_type": "responsive",
            "control_text": "Responsive"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-mobilebreakpoint",
            "min": "360",
            "max": "960",
            "step": "10",
            "units": "px",
            "control_class": "azh-mobileBreakPoint",
            "control_type": "mobileBreakPoint",
            "control_text": "Mobile breakpoint"
        },
        {
            "type": "dropdown-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "options": {
                "bottomRight" : "Bottom right",
                "bottomCenter" : "Bottom center",
                "bottomLeft" : "Bottom left",
                "left" : "Left",
                "center" : "Center",
                "right" : "Right",
                "topRight" : "Top right",
                "topCenter" : "Top center",
                "topLeft" : "Top left",
            },
            "attribute": "data-mobilelocation",
            "control_class": "azh-mobileLocation azh-default",
            "control_type": "mobileLocation",
            "control_text": "Mobile location"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-mobilewidth",
            "slider": true,
            "units": {
                "px": {
                    "min": "200",
                    "max": "480",
                    "step": "1",
                },
                "%": {
                    "min": "50",
                    "max": "100",
                    "step": "1",                                        
                }
            },            
            "control_class": "azh-mobileWidth",
            "control_type": "mobileWidth",
            "control_text": "Mobile width"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-mobileheight",
            "slider": true,
            "units": {
                "px": {
                    "min": "50",
                    "max": "640",
                    "step": "1",
                },
                "%": {
                    "min": "50",
                    "max": "100",
                    "step": "1",                                        
                }
            },            
            "control_class": "azh-mobileHeight",
            "control_type": "mobileHeight",
            "control_text": "Mobile height"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-mobileradius",
            "slider": true,
            "units": {
                "px": {
                    "min": "0",
                    "max": "30",
                    "step": "1",
                },
                "%": {
                    "min": "50",
                    "max": "100",
                    "step": "1",                                        
                }
            },            
            "control_class": "azh-mobileRadius",
            "control_type": "mobileRadius",
            "control_text": "Mobile radius"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-mobilemargin",
            "min": "0",
            "max": "100",
            "step": "1",
            "units": "px",
            "control_class": "azh-mobileMargin",
            "control_type": "mobileMargin",
            "control_text": "Mobile margin"
        },
        {
            "type": "integer-attribute",
            "selector": ".az-popup",
            "menu": "utility",
            "group": "Mobile rules",
            "attribute": "data-mobilepadding",
            "min": "0",
            "max": "100",
            "step": "1",
            "units": "px",
            "control_class": "azh-mobilePadding",
            "control_type": "mobilePadding",
            "control_text": "Mobile padding"
        },
    ]);
    box_shadow_utility(".az-popup", 'data-popupboxshadow', 'Popup styling');
    if (!('modal_options' in azh)) {
        azh.modal_options = [];
    }
    azh.modal_options = azh.modal_options.concat([
    ]);
})(window.jQuery);