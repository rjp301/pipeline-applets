import proj4 from 'proj4';
import crs from './crs.json';

for (let c of crs) {
	proj4.defs(c.name, c.proj);
}
