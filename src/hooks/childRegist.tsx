import type { InformationItem } from '@/components/common/InformationPanel/types';
import { TypewriterText } from '@/components/common/TypewriterText'
import CustomSelect from '@/components/common/Select/Index'
import { PLAYER_HONORIFIC_TITLE, PLAYER_SCHOOLING } from '@/constants'
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

    const handleSuffix = (value: string) => {
        setChildInfo('suffix', value)
      }
      const handleSchoolYear = (value: string) => {
        setChildInfo('schoolYear', value)
      }

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
                    <div className="flex w-full flex-col items-center gap-3">
            <TypewriterText
              text="お子様のユーザー登録"
              className="font-bold text-xl text-green-800"
            />
            <div className="border mx-auto mb-4" style={{ borderColor: '#2f855a' ,width:'95%' }}></div>
            <div className='w-full flex font-semibold justify-start text-sm'>保護者のユーザ登録が完了しました。</div>
            <div className='w-full flex font-semibold justify-start text-sm'>できたのげんせきを集めるお子様の登録をお願いします。</div>
            <div className="flex flex-col">
              <div className="space-y-2 ">
                <label htmlFor="nickname" style={{ backgroundColor: '#2f855a', borderRadius: '5px',fontSize:'12px', width: '150px' }} className="text-white font-semibold px-6 py-2 text-center mx-auto block">
                  ニックネーム
                </label>
                <div className='flex gap-2'>
                  <input
                    id="nickname"
                    type="text"
                    value={childinfo?.name}
                    onChange={handleNicknameChange}
                    maxLength={8}
                    className="w-full font-semibold text-center border-2 rounded-md"
                    style={{ borderColor: '#00803a' ,outline:'none', height:'45px' }}
                    aria-label="ニックネームを入力"
                  />


                  <CustomSelect
                    options={PLAYER_HONORIFIC_TITLE}
                    value={childinfo?.suffix}
                    onChange={handleSuffix}
                  />

                </div>

              </div>

              <div className="justify-center mt-10 ">
                <label style={{ backgroundColor: '#2f855a', borderRadius: '5px', fontSize: '14px', width: '150px' }} className="text-white px-6 py-2 font-semibold text-center  mx-auto block mb-3">
                  学年
                </label>
                <div className="flex flex-col items-center">

                  <CustomSelect
                    options={PLAYER_SCHOOLING}
                    value={childinfo?.schoolYear}
                    width='150px'
                    onChange={handleSchoolYear}
                    
                  />

                  <span className="text-xs p-2 mt-6 bg-gray-300 font-semibold text-center">
                    ※学年は後からの変更はできませんのでご注意ください。
                  </span>
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