from django.contrib import admin
from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('', views.getUsers, name='users'),
    path('profile/', views.getUserProfile, name='users_profile'),
    # for user updating own profile
    path('profile/update/', views.updateUserProfile, name='user_profile_update'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('delete/<str:pk>/', views.deleteUser, name='user_delete'),
    # for admin updating user's profile
    path('update/<str:pk>/', views.updateUser, name='user_update'),
    path('<str:pk>/', views.getUserById, name='user'),
]