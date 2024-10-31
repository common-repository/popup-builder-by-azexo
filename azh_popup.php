<?php

/*
  Plugin Name: Popup Builder by AZEXO
  Description: Popup Builder for WordPress
  Author: azexo
  Author URI: http://azexo.com
  Version: 1.27.1
  Text Domain: azp
 */

define('AZP_VERSION', '1.27');
define('AZP_URL', plugins_url('', __FILE__));
define('AZP_DIR', trailingslashit(dirname(__FILE__)));

add_action('plugins_loaded', 'azp_plugins_loaded');

function azp_plugins_loaded() {
    load_plugin_textdomain('azp', FALSE, basename(dirname(__FILE__)) . '/languages/');
}

add_action('admin_notices', 'azp_admin_notices');

function azp_admin_notices() {
    if (!defined('AZH_VERSION')) {
        $plugin_data = get_plugin_data(__FILE__);
        print '<div class="updated notice error is-dismissible"><p>' . $plugin_data['Name'] . ': ' . __('please install <a href="https://codecanyon.net/item/azexo-html-customizer/16350601">Page builder by AZEXO</a> plugin.', 'azp') . '</p><button class="notice-dismiss" type="button"><span class="screen-reader-text">' . esc_html__('Dismiss this notice.', 'azp') . '</span></button></div>';
    }
}

add_filter('azh_directory', 'azp_directory');

function azp_directory($dir) {
    $dir[untrailingslashit(dirname(__FILE__)) . '/azh'] = plugins_url('', __FILE__) . '/azh';
    return $dir;
}

add_action('admin_enqueue_scripts', 'azp_admin_scripts');

function azp_admin_scripts() {
    if (isset($_GET['azh']) && $_GET['azh'] == 'customize') {
        wp_enqueue_script('azp-popup-frontend-customization-options', plugins_url('frontend-customization-options.js', __FILE__), array(), false, true);
        wp_enqueue_style('azp_admin_frontend', plugins_url('css/admin-frontend.css', __FILE__));
    }
}

add_action('wp_enqueue_scripts', 'azp_scripts');

function azp_scripts() {
    wp_enqueue_style('azp_frontend', plugins_url('css/frontend.css', __FILE__));
    wp_enqueue_script('azp_frontend', plugins_url('js/frontend.js', __FILE__), array('jquery'), false, true);
    if (isset($_GET['azh']) && $_GET['azh'] == 'customize') {
        wp_enqueue_script('azp-popup-frontend-customization-options', plugins_url('frontend-customization-options.js', __FILE__), array(), false, true);
    }
}

add_action('azh_widget_args', 'azp_widget_args', 10, 3);

function azp_widget_args($args, $instance, $body) {
    if (strpos($body, 'az-popup') !== false) {
        $args['before_widget'] = str_replace('widget_azh_widget', 'widget_azh_widget widget_azh_popup', $args['before_widget']);
    }
    return $args;
}
