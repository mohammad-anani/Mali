import Loading from '@/src/components/util/Loading';
import { router } from 'expo-router';

export default function index() {

  router.replace("/app/actions/deposits/list");


  return <Loading />
}
