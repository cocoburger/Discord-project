import {currentUser, redirectToSignIn} from '@clerk/nextjs';

import {db} from '@/lib/db';

export const initIalProfile = async () => {
    // NOTE: clerk api를 사용함
    const user = await currentUser();

    //현재 유저가 없다면 (로그인 안된 상태) 로그인 페이지로 이동
    if (!user) {
        return redirectToSignIn();
    }

    // 현재 로그인된 USER 정보를 가져온다.
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });

    //현재 db에 저장되어있는경우 profile을 리턴
    if (profile) {
        return profile;
    }

    //db에 저장이 안된경우 첫 로그인 insert를 해준다.
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });

    return newProfile;
};
