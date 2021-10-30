<div align="center">
    <br/>
    <h1><strong><em>🌴 PICSHARE</em></strong></h1>
    <img width="700" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137115789-119d7a65-8fad-410d-802c-f5636530de4c.png">
    <br/>
    <br/>
    <p>
      PICSHARE는 <strong><em>Picture + Share</em></strong> 의 뜻을 지니고 있습니다.<br/> 
      '사진을 공유한다'의 의미로, 사진을 통해 서로의 추억을 공유하는 사이트입니다. <br/>
      자신의 일상이나 여행, 혹은 특별한 일상에서 촬영한 사진의 작품을 다른 사람이 구매하여 사진을 나눌 수 있습니다.<br/>
    </p>
    <br/>
    <br/>
    <a href="https://picshare-with-you.herokuapp.com/"><strong>picshare-with-you</strong></a>
</div>
    <br/>
    <br/>
    <br/>
<div>
    <h2>🚀 Shortcut</h2>
<div> 
        
- [__Improvement__](#improvement)
- [__Tech Stack Used__](#tech)
- [__Features__](#feature)
- [__Structure__](#structure)
    <br/>
    <br/>
    <br/>
<div>
    <h2 id="improvement">🌿 Improvement</h2>
    <ul>
      <li>
        <h3>✔️ MERN </h3> 
        <p>
          웹개발의 흐름이 어떻게 진행되는지에 대한 이해도가 부족했기에 흐름 이해에 상대적으로 용이한 MERN스택을 사용하게 되었습니다. 
          MongoDB, Express, React, Node.js의 구조를 통해서 프론트엔드-백엔드(서버)-데이터베이스가 어떻게 상호작용하는지의 흐름을 이해하였습니다. 또한 mongoDB와 같은 noSQL(비관계형 데이터베이스)과도 어떻게 상호작용하는지 알게되었습니다.
          express를 통한 서버구축 후, react를 이용한 프론트엔드와 소통하고 프론트엔드의 필요에 따라 데이터를 요구하면 서버가 데이터베이스에서 알맞은 정보를 가져와 프론트엔드로 전달해줍니다. 
        </p>
      </li>
      <li>
        <h3>✔️ MVC pattern</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>클라이언트가 서버와 통신할 때, '무엇'을 '어떻게' 처리하여 클라이언트에게 '보여줄 것'인지에 대해 어떻게 구성해야할 지가 큰 관건이었습니다. 구분없이 한 챕터에서 데이터 생성, 처리, 전달의 역할을 모두 구현한다면 코드가 매우 복잡하고 유지보수가 힘들기 때문입니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                <strong><em>Model, View, Controller</em></strong> 의 구조를 통하여 사용자 인터페이스로부터 로직을 분리하여 유지보수에 유리하도록 설정하였습니다. 
                Model, View, Controller는 mvc 패턴을 통하여 각각의 기능에만 집중할 수 있도록 설정되었습니다.
              </p>
            </li>
          </ul>
      </li>
      <li>
        <h3>✔️ Authentication</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>로그인한 사용자로부터 각각의 요청에 어떠한 방법을 사용하여 인증과정을 처리할지에 대한 고민이 있었습니다. 인증관련 정보를 모두 DB에 저장했을시에는 사용자가 늘어남에 따라 필요한 저장공간이 증가했습니다.</p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                <strong><em>JWT인증토큰</em></strong> 을 통하여 로그인 사용자정보를 인증할 수 있도록 하였는데 이는 사용자의 인증정보를 토큰에 가지고 있어 별도의 저장소가 필요하지 않는 장점이 있었습니다. 또한 로그인된 사용자의 정보는 각각의 요청마다 반복되는 부분은 express의 <strong><em>middleware</em></strong> 를 통하여 인증처리를 구현하도록 하였습니다.
                추가로, 사용자는 등록할 때 비밀번호를 6자리 이상으로 설정해야하며, 사용자의 비밀번호를 DB에 저장할 때에는 보호를 위하여 Bcrypt를 이용하여 비밀번호를 해싱하여 저장하였습니다. 
              </p>
            </li>
          </ul>
      </li>
      <li>
        <h3>✔️ Authorization</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>사용자의 등급에 따라서(로그인하지 않은 유저, 로그인한 유저, 관리자) 볼 수있는 데이터에 제한을 두고 싶었습니다. 페이지 접속 권한의 제한을 등급에 따라 어떻게 차등할 것인 가에 대한 요구가 있었습니다.</p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>AdminRoute, PrivateRoute를 통해서 각각의 싱글페이지에 대해서 접속이 가능한 대상을 다르게 설정하여, 사용자가 관리자인지, 회원인지, 로그인하지 않은 대상인지에 따라 액세스 권한부여를 다르게 설정하였습니다. 만약 권한이 제한된 페이지로 이동한 사용자라면 이전페이지나 다른페이지로 이동하도록 설정하였습니다. </p>
            </li>
          </ul>       
      </li>
      <li>
        <h3>✔️ Social Login</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>사용자의 편의성을 고려한 소셜로그인 기능을 만들고자 하였습니다.</p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>react-googel-login 라이브러리를 이용하여 로그인 버튼을 만들고 구글에서 사용자 정보를 받아오면 받아온 사용자정보를 사용해 회원가입을 진행하도록 하였습니다.</p>
            </li>
          </ul>       
      </li>      <li>
        <h3>✔️ Redux</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>처리할 데이터양이 많아지게 될 수록, state이 변화하게 되면 Model, View, Controller변화가 발생하게 되고 데이터 양방향의 흐름에 의해 데이터 흐름의 파악이 힘들어지게 되었습니다. 어디서부터 데이터가 변경이 되었고 어떻게 데이터가 변경되었는지, 앱이 커질수록 상태관리가 어려워졌습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>리덕스를 통하여 View에서는 action만을 실행시키면 이 액션은 dispatcher를 통해서만 데이터변경이 가능하도록 설정해주었습니다. 변경된 데이터는 store를 통해서 View로 전달이 되도록 하여 단방향의 데이터 흐름이 이루어지도록 설정하였습니다. 또한 Constant를 지정하여 각각의 액션에 요청, 성공, 실패의 경우를 알아보기 쉽게 정의하였고 각각의 액션은 모두 저장되어 어떻게 데이터가 변경되었는지 확인할 수 있었습니다. </p>
            </li>
          </ul> 
      </li>
      <li>
        <h3>✔️ Pagination & Sort</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>데이터 양이 많아질 수록 한번에 모든 데이터를 가져오는 것이 힘들어졌습니다. 또한 데이터를 가져올때, 지정된 기준에 따라 순서대로 데이터를 가져오는 것이 필요해졌습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>데이터를 불러올 때, mongoDB의 sort기능을 통해서 정렬기준을 설정해 정렬된 데이터를 순서대로 가져오도록 설정했습니다. 또한 정렬된 데이터에 limit을 두어 각각의 페이지에 따라서 불러올 데이터를 다르게 설정하도록 하였습니다. </p>
            </li>
          </ul> 
        </li>
      <li>
        <h3>✔️ Payment</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>실제로 주문과 구매가 이루어지는 e-commerce이기 때문에 결제시스템이 필요하였습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>Paypal developer에서 계정을 생성하고 'react-paypal-button-v2'의 Paypal버튼을 이용하여 주문이 이루어질 수 있도록 설정하였습니다. </p>
            </li>
          </ul> 
        </li>
      <li>
        <h3>✔️ Map</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>사용자가 주소를 검색을 이용할 때, 보다 정확한 위치를 파악하도록 하는 것이 필요하였습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>react google api를 이용하여 주소를 검색한 후 지도상에서 보다 정확한 위치를 파악할 수 있도록 진행하였습니다. </p>
            </li>
          </ul> 
        </li>
      <li>
        <h3>✔️ Mail</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>사용자가 주문을 완료하면 주문내역을 메일로 전송하여 확인하도록 하고자 하였습니다. 또, 판매자에게 직접 사용자가 링크를 통해 메일보내기가 가능하도록 하고자 하였습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>nodemailer와 mailtrap포트를 이용하여 주문이 완료되면 안내메일이 전달되도록 설정하였습니다. 판매자 프로필페이지에서는 'contact'버튼을 누르면 mailto기능을 사용하여 메일보내기가 가능하도록 설정하였습니다. </p>
            </li>
          </ul> 
        </li>
    </ul>
</div>
    <br/>
    <br/>
    <br/>
<div>
    <h2 id="tech">🛠 Tech Stack Used</h2>
    <ul>
      <li>
        <h4>Frontend</h4> 
        <img src="https://img.shields.io/badge/react-6cc1d9?style=for-the-badge&logo=react&logoColor=white">
        <img src="https://img.shields.io/badge/redux-bb93e6?style=for-the-badge&logo=redux&logoColor=white">
        <img src="https://img.shields.io/badge/fontawesome-102969?style=for-the-badge&logo=redux&logoColor=white">
        <img src="https://img.shields.io/badge/bootstrap-3e1b6b?style=for-the-badge&logo=redux&logoColor=white">
        <img src="https://img.shields.io/badge/socket.io Client-e37dc9?style=for-the-badge&logo=socket.io&logoColor=white">
      </li>
      <li>
        <h4>Backend</h4> 
        <img src="https://img.shields.io/badge/mongodb-609e46?style=for-the-badge&logo=mongoDB&logoColor=white">
        <img src="https://img.shields.io/badge/express-020d00?style=for-the-badge&logo=express&logoColor=white">
        <img src="https://img.shields.io/badge/node.js-f7c920?style=for-the-badge&logo=node.js&logoColor=black">
        <img src="https://img.shields.io/badge/socket.io-e37dc9?style=for-the-badge&logo=socket.io&logoColor=white">
      </li>
      <li>
        <h4>Deploy</h4> 
        <img src="https://img.shields.io/badge/heroku-ad7dac?style=for-the-badge&logo=heroku&logoColor=white">
      </li>
    </ul>
</div>
    <br/>
    <br/>
    <br/>
<div id="feature">
</div>
    
🪵 Features
--
<br/>
<h4> 🌱 사용자, 상품, 주문에 대한 정보 CRUD(Create, Read, Update, Delete) 가능</h4>
<h4> 🌱 상품명 혹은 키워드를 통해서 원하는 상품 검색 가능</h4>
<h4> 🌱 상품을 원하는 방식에 따라서 평점, 가격, 기타의 조건으로 조회 가능</h4>
<h4> 🌱 상품을 카테고리별로 조회 가능</h4>
<h4> 🌱 판매자 정보를 확인할 수 있고 mail을 통해서 연락하기 가능</h4>
<h4> 🌱 주문완료시 주문내역을 이메일로 확인 가능</h4>
<h4> 🌱 구글 계정으로 소셜로그인 가능</h4>
<br/>

|  |  |
|:--------|:--------:|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137115789-119d7a65-8fad-410d-802c-f5636530de4c.png"></br><p><strong>메인페이지</strong></p><p>상단에는 제일 평점이 높은 상품 2개의 이미지 노출.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137107947-a4628e6b-5bda-425e-8b46-588f275f37ba.png"></br><p><strong>메인페이지</strong></p><p>하단에는 최신등록 상품부터 limit만큼 정렬.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 58 42" src="https://user-images.githubusercontent.com/63947424/137109965-1bcae8de-191a-42b4-a6cc-0e70735a5395.png"></br><p><strong>제품상세페이지</strong></p><p>상단에는 상품에대한 정보 노출.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137110158-d4573d80-6985-4479-8cbd-0b9300aba24b.png"></br><p><strong>제품상세페이지</strong></p><p>하단에는 리뷰와 리뷰작성란.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 58 42" src="https://user-images.githubusercontent.com/63947424/137114954-c2e69fdf-f8ec-4f91-9d9c-cebf0b70516c.png"></br><p><strong>제품페이지</strong></p><p>원하는 조건에 따라 검색 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137114973-31a32be1-f401-4999-a45f-734db35711c4.png"></br><p><strong>판매자 페이지</strong></p><p>판매자에 대한 정보와 판매자 판매 물품 .</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 58 42" src="https://user-images.githubusercontent.com/63947424/137110772-ce774b00-9fcf-471f-b3d1-1d930c951a27.png"></br><p><strong>카트페이지</strong></p><p>좌측에는 상품정보, 우측엔 total.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137110978-67c2782f-7e86-4281-9b3c-d3143b03b6d4.png"></br><p><strong>배송주소페이지</strong></p><p>배송받을 주소를 작성하는 페이지.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 58 42" src="https://user-images.githubusercontent.com/63947424/137111593-b197de3a-664b-4743-950b-500fa0100013.png"></br><p><strong>주문페이지</strong></p><p>주문후 결제창.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137111690-8e1e6231-872d-449d-a751-97766567fa02.png"></br><p><strong>페이팔</strong></p><p>페이팔을 통해 결제가 가능.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 58 42" src="https://user-images.githubusercontent.com/63947424/137112145-2712ee7a-c67f-4a3a-be08-bb138bfcd9ae.png"></br><p><strong>주문상세페이지</strong></p><p>배송정보, 결제정보 확인 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137112173-a22226df-ac64-402e-af97-dec1960333c4.png"></br><p><strong>주문리스트</strong></p><p>주문리스트에서 주문확인 가능.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 58 42" src="https://user-images.githubusercontent.com/63947424/139514794-21f19df5-1710-4b46-91dd-f7633251e708.jpg"></br><p><strong>로그인 페이지</strong></p><p>소셜 로그인 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/139514848-4ee6ba2b-3f6d-4d1e-9f33-628b5d3b0d7d.jpg"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/139514853-993bfedf-a50b-4467-a992-ccd874cc134e.jpg"></br><p><strong>Responsive 페이지</strong></p><p>화면크기에 따라 반응형 웹페이지 가능.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 58 42" src="https://user-images.githubusercontent.com/63947424/139515350-2ceae572-5bcf-4164-aff2-80907df2c506.png"></br><p><strong>Mail</strong></p><p>판매자에게 연락하기 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/139514976-238b5297-1cd4-490c-a8bb-5040a9755d81.jpg"></br><p><strong>Mail</strong></p><p>주문내역확인 메일 수신 가능.</p></div>|
   
<div>
    <br/>
    <br/>
    <br/>
    <h2 id="structure">🧱 Structure</h2>
</div>

```bash
📦Picshare
├── 🗂backend
│   ├── models
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes
│   │   ├── orderRouter.js
│   │   ├── productRouter.js
│   │   ├── profileuploadRouter.js
│   │   ├── uploadRouter.js
│   │   └── userRouter.js
│   ├── server.js
│   └── utils.js
├── 🗂frontend
│   ├── src
│   │   ├── App.js
│   │   ├── actions
│   │   │   ├── cartActions.js
│   │   │   ├── orderActions.js
│   │   │   ├── productActions.js
│   │   │   └── userActions.js
│   │   ├── components
│   │   │   ├── AdminRoute.js
│   │   │   ├── ChatBox.js
│   │   │   ├── CheckoutSteps.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── HomeProduct.js
│   │   │   ├── LoadingBox.js
│   │   │   ├── MessageBox.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── Product.js
│   │   │   ├── Rating.js
│   │   │   ├── ReviewCard.js
│   │   │   ├── SearchBox.js
│   │   │   ├── SearchProduct.js
│   │   │   ├── SellerRoute.js
│   │   │   └── TopProduct.js
│   │   ├── constants
│   │   │   ├── cartConstants.js
│   │   │   ├── orderConstants.js
│   │   │   ├── productConstants.js
│   │   │   └── userConstants.js
│   │   ├── reducers
│   │   │   ├── cartReducers.js
│   │   │   ├── orderReducers.js
│   │   │   ├── productReducers.js
│   │   │   └── userReducers.js
│   │   ├── screens
│   │   │   ├── CartScreen.js
│   │   │   ├── DashboardScreen.js
│   │   │   ├── HomeScreen.js
│   │   │   ├── MapScreen.js
│   │   │   ├── OrderHistoryScreen.js
│   │   │   ├── OrderListScreen.js
│   │   │   ├── OrderScreen.js
│   │   │   ├── PaymentMethodScreen.js
│   │   │   ├── PlaceOrderScreen.js
│   │   │   ├── ProductCreateScreen.js
│   │   │   ├── ProductEditScreen.js
│   │   │   ├── ProductListScreen.js
│   │   │   ├── ProductScreen.js
│   │   │   ├── ProfileScreen.js
│   │   │   ├── RedirectUri.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── SearchScreen.js
│   │   │   ├── SellerScreen.js
│   │   │   ├── ShippingAddressScreen.js
│   │   │   ├── SigninScreen.js
│   │   │   ├── SupportScreen.js
│   │   │   ├── UserEditScreen.js
│   │   │   └── UserListScreen.js
│   │   ├── style
│   │   │   ├── Auth.css
│   │   │   ├── Cart.css
│   │   │   ├── CheckoutStep.css
│   │   │   ├── EditProduct.css
│   │   │   ├── Footer.css
│   │   │   ├── Header.css
│   │   │   ├── Home.css
│   │   │   ├── List.css
│   │   │   ├── OrderDetail.css
│   │   │   ├── Payment.css
│   │   │   ├── ProductCard.css
│   │   │   ├── ProductDetail.css
│   │   │   ├── Profile.css
│   │   │   ├── SearchScreen.css
│   │   │   ├── SellerScreen.css
│   │   │   └── Shipping.css
│   │   ├── store.js
│   │   ├── env.js
│   │   ├── images
│   │   ├── index.css
│   │   ├── index.js
│   │   └── utils.js
├── Procfile
├── profileuploads
├── template
└── uploads
```