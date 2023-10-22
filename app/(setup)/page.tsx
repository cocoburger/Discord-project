import {initIalProfile} from '@/lib/initIal-profile';
import {db} from '@/lib/db';
import {redirect} from 'next/navigation';
import {InitialModal} from '@/components/modals/initial-modal';

const SetupPage = async () => {
    const profile = await initIalProfile();
    const server = await db.server.findFirst({
        where: {
            // @ts-ignore
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });
    if (server) {
        return redirect(`/servers/${server.id}`);
    }
    return <InitialModal>Create A SERVER</InitialModal>;
};

export default SetupPage;
