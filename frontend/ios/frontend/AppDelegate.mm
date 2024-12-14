#import "AppDelegate.h"
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>  // 네이버 로그인 SDK 추가
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"frontend";  // React Native 모듈 이름 설정
  self.initialProps = @{};  // 초기 Props 설정

  RCTBridge *bridge = [[RCTBridge alloc]] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"frontend" initialProperties:nil];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  // 네이버 로그인 SDK 초기화
  [NaverThirdPartyLoginConnection getSharedInstance].isNaverAppOauthEnable = NO;  // Naver 앱 OAuth 비활성화
  [NaverThirdPartyLoginConnection getSharedInstance].isInAppOauthEnable = YES;  // In-App OAuth 활성화
  [NaverThirdPartyLoginConnection getSharedInstance].consumerKey = @"Xyho5Y98bYLW2GizVv49";  // 네이버 개발자 센터에서 발급받은 Consumer Key
  [NaverThirdPartyLoginConnection getSharedInstance].consumerSecret = @"A7koS2rbb4";  // 네이버 개발자 센터에서 발급받은 Consumer Secret
  [NaverThirdPartyLoginConnection getSharedInstance].appName = @"Xyho5Y98bYLW2GizVv49";  // 앱 이름 설정

//   return [super application:application didFinishLaunchingWithOptions:launchOptions];
    return yes;
}

// 네이버 로그인 콜백 처리
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
