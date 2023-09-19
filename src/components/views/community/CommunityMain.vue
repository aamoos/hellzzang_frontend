<template>
    <!-- Jumbotron -->
<!-- <div class="jumbotron text-center">
    <h1>Welcome to Our Community</h1>
    <p>Join our vibrant community of like-minded individuals.</p>
    <a href="#" class="btn btn-primary btn-lg">Join Now</a>
</div> -->

<!-- Content Section -->
<div class="container" style="min-height: 200vh;">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Community News</h5>
                    <p class="card-text">Stay updated with the latest community news and updates.</p>
                    <!-- <a href="#" class="btn btn-primary">Read More</a> -->
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Community Forum</h5>
                    <p class="card-text">Engage in discussions and share your thoughts in our forum.</p>
                    <!-- <a href="#" class="btn btn-primary">Visit Forum</a> -->
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Upcoming Events</h5>
                    <p class="card-text">Check out our upcoming community events and activities.</p>
                    <!-- <a href="#" class="btn btn-primary">View Events</a> -->
                </div>
            </div>
        </div>
    </div>
    <br>
    <!-- 스크롤마다 따라다니는 글쓰기 버튼 -->
    <div class="col-md-4">
        <router-link to="/community/write">
            <button type="button" class="btn btn-outline-primary btn-sm">글쓰기</button>
        </router-link>
    </div>
</div>
</template>
<script>
export default {
  mounted() {

  },
};
</script>