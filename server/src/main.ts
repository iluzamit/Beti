import { Env } from './env';
import { args } from './args';
Env.set(args);
import { Scripts } from './scripts';

main(args);
async function main(_args) {
    Scripts.run(_args);
}
