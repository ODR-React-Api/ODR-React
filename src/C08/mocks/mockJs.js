import Mock from 'mockjs'


Mock.mock('/GetQuestionnaires', 'get', (Option) => {
    const ret = Mock.mock(
        {
        //アンケート回答済みかフラグ
        count: 0,
        lista:[
        {
            //アンケートの表示内容
            Description:'他人におすすめしたいですか。',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:0,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:1,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1
        },
        {
            //アンケートの表示内容
            Description:'また利用したいですか。',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:0,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:2,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        },
        {
            //アンケートの表示内容
            Description:'システムには満足していですか。',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:0,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:3,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        },
        {
            //アンケートの表示内容
            Description:'問題を解決できたか。',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:0,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:4,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        },
        {
            //アンケートの表示内容
            Description:'スムーズでしたか。',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:0,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:5,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        },
        {
            //アンケートの表示内容
            Description:'スピード感は問題ないでしょうか。',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:0,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:6,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        },
        {
            //アンケートの表示内容
            Description:'感想は？',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:1,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:7,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        },
        {
            //アンケートの表示内容
            Description:'意見は？',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:1,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:8,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        },
        {
            //アンケートの表示内容
            Description:'コメントを残してください。',
            //アンケートの表示タイプ(0:radio 1:textArea)
            Type:1,
            //アンケートの表示・非表示(0:非表示　1:表示)
            ActiveFlag:1,
            //アンケートの表示順位(順番通りで表示する)
            Order:9,
            //アンケートの表示必須・任意(1:必須タグ　0:任意タグ)
            RequireFlag:1  
        }]
    }
    )
    return{
        status: 200,
        data: ret
    } 
})