<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'kawebb');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'D!H|;0~=Ko?XW2sQqu+&rX%Mm$jS+O;*ID%TZ+^CLYV/,qrT<ZY)hyL+Wr}cMHaP');
define('SECURE_AUTH_KEY',  'B4MMa=}4X* p_+:F,BOxApSfw/7,s@k<:5JOHKy4ta2e-Xuqp=g#,mX!nV,_<<(c');
define('LOGGED_IN_KEY',    'S#4`t<6lfV*A}Abi.-NFjXJ([C5ej|;ND]cC_n%d$C5XR|nty-h:_~XB@N7WvrXH');
define('NONCE_KEY',        'QbH&v<3vge?$Hmr,[AF#m]Fy*5DSX88CZ_|hcqEx^K-)wZS3D(sp]|,+OIIeqW|`');
define('AUTH_SALT',        'z>;M~[.2@~S|3GUYSRJ|XH)o8G]Hr?d+jnWW=Z /9kkNq/s9wPXs&w=pA1E/Zr|c');
define('SECURE_AUTH_SALT', ';4[@*=lb+R+|ATo!hv[gY2OZ,SSauUX]mKeT{&]kZ.^DV`RE`q L: p`!+G(9Hb[');
define('LOGGED_IN_SALT',   '7tH|>`]J |@>9tkK9_Gdvgp{mgH8]1bU7n8-fqPO.DRs,p:x+z}BV0W@$KDlM(3I');
define('NONCE_SALT',       'iQFF%D^nP/rC8;ueXJ^h-Rfc:cs)~kF_MOM7vh@DW0|hprEZRYFRq%(cR8[]>/AU');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_bageri';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
