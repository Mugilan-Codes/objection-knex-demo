#!/bin/sh
# wait-for-mysql.sh

set -e
  
host="$1"
shift
  
until mysql -h "$host" -u $DB_USER --password=$DB_PASSWORD $DB_NAME -e 'SELECT 1'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "MySQL is up - executing command"
exec "$@"