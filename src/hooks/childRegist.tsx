import type { InformationItem } from '@/components/common/InformationPanel/types';

export const ChildRegist = ({
    childinfo,
    setChildInfo,
}: {
    childinfo: { name: string; schoolYear: string; suffix: string };
    setChildInfo: (key: keyof typeof childinfo, value: string) => void;
}) => {

    const names = ['くん', 'ちゃん', 'さん', 'なし'];
    const schoolyear = ['年少', '年中', '年長', '小学1年生', '小学2年生', '小学3年生', '小学4年生', '小学5年生', '小学6年生'];

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNickname = e.target.value;
        setChildInfo('name', newNickname);
    };

    const handleSuffixChange = (newSuffix: string) => {
        setChildInfo('suffix', newSuffix === 'なし' ? '' : newSuffix);
    };

    const handleSchoolYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSchoolYear = e.target.value;
        setChildInfo('schoolYear', newSchoolYear);
    };

    const items: InformationItem[] = [
        {
            id: "verificate",
            content: (

                <div className='flex justify-center gap-6 mb-20'>
                    <div className='text-center font-semibold mb-20'>
                        <h1 className='text-m text-green-800 mb-3'>ユーザー登録</h1>
                        <div className="border mx-auto mb-4" style={{ borderColor: '#2f855a', width: '95%' }}></div>
                        <p className='w-full flex text-left'>アクセスいただいたURLを検証しています。。。。</p>
                        <div className='w-full flex justify-start'>OK !</div>
                        <div className='w-full flex justify-start'>登録が完了しました。</div>
                    </div>
                </div>
            )
        },
        {
            id: 'input',
            content: (
                <form
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-full w-full flex-col items-center justify-between gap-6 p-6"
                >
                    <div className="flex w-full flex-col items-center gap-6">
                        <span className="whitespace-pre-line text-xl font-small">
                            ユーザ登録が完了しました。できたのげんせきを集めるお子様の登録をお願いします。
                        </span>
                        <div className="flex w-full flex-col gap-4">
                            <div className="space-y-2">
                                <label htmlFor="nickname" className="text-sm font-bold text-gray-700">
                                    【ニックネーム】
                                </label>
                                <input
                                    id="nickname"
                                    type="text"
                                    value={childinfo?.name}
                                    onChange={handleNicknameChange}
                                    style={{ borderBottom: '2px solid black' }}
                                    className="w-full px-4 py-2 text-center text-1xl font-bold !text-green-600 focus:border-b-green-500 focus:outline-none focus:ring-0 bg-transparent"
                                    aria-label="ニックネームを入力"
                                />
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {names.map((suffixItem) => (
                                        <button
                                            type="button"
                                            key={suffixItem}
                                            onClick={() => handleSuffixChange(suffixItem)}
                                            className={`flex-shrink-0 rounded-full px-3 py-2 w-20 text-center text-white 
                                            ${childinfo?.suffix === suffixItem ? 'bg-green-700' : 'bg-green-500'}`}
                                          aria-pressed={childinfo?.suffix === suffixItem}  
                                        >
                                            {suffixItem}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">【がくねん】</label>
                                <div className="flex gap-2">
                                    <select
                                        value={childinfo?.schoolYear}
                                        onChange={handleSchoolYearChange}
                                        style={{ borderBottom: '2px solid black' }}
                                        className="w-full py-2 text-center text-1xl !text-green-600"
                                    >
                                        {schoolyear.map((year, index) => (
                                            <option key={index} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            ),
        },
        {
            id: 'final',
            content: (
                <div className="flex flex-col items-center gap-4">
                    <span className="whitespace-pre-line text-center text-xl font-medium">
                        お子様の登録が完了しました。ご兄弟を追加するには、保護者様のメニューより追加いただけます。
                    </span>
                </div>
            ),
        },
    ];

    return {
        items,
    };
};